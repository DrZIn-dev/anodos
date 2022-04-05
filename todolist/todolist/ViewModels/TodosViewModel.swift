//
//  TodosViewModel.swift
//  todolist
//
//  Created by Nuttapon Buaban on 22/3/2565 BE.
//

import Foundation
import SwiftUI

class TodosViewModel: ObservableObject {
    @Published var todos: [Todo] = []
    @Published var user: User = User(id: nil)
    @Published var newTodoString: String = ""
    @Published var isShowSheet: Bool = false
    @Published var selectedTodoId:UUID? = nil
    
    private var defaults: UserDefaults = UserDefaults()
    
    func initialApp() {
        if let id = self.defaults.string(forKey: DefaultKeys.user) {
            self.user = User(id: UUID(uuidString: id))
        } else {
            let id = UUID()
            self.user = User(id: id)
            self.defaults.set(id.description, forKey: DefaultKeys.user)
        }
    }
    
    func fetchTodos() async throws {
        //fetch todos
        let urlString = Constants.baseURL + Endpoint.todos
        
        guard let url = URL(string: urlString) else {
            throw HttpError.badURL
        }
        guard let userId:UUID = self.user.id else {
            throw HttpError.badURL
        }
        
        let todoResponse: [Todo] = try await HttpClient.shared.fetch(url: url, userId: userId)
        DispatchQueue.main.async {
            self.todos = todoResponse
        }
    }
    
    func setShowSheet(_ isShow:Bool) {
        self.isShowSheet = isShow
    }
    
    func create() async throws {
        let urlString = Constants.baseURL + Endpoint.todos
        
        guard let url = URL(string: urlString) else {
            throw HttpError.badURL
        }
        guard let userId:UUID = self.user.id else {
            throw HttpError.badURL
        }
        
        let body = [ "text": self.newTodoString ]
        
        try await HttpClient.shared.sendData(to: url,
                                             object: body,
                                             httpMethod: HttpMethods.POST.rawValue,
                                             userId: userId)
        self.newTodoString = ""
        try await fetchTodos()
    }
    
    func update() async throws {
        guard let todoId = self.selectedTodoId else {
            return
        }
        let urlString = Constants.baseURL + Endpoint.todos + "/\(todoId.description)"
        
        guard let url = URL(string: urlString) else {
            throw HttpError.badURL
        }
        guard let userId:UUID = self.user.id else {
            throw HttpError.badURL
        }
        
        let body = [ "done": true ]
        
        try await HttpClient.shared.sendData(to: url,
                                             object: body,
                                             httpMethod: HttpMethods.PATCH.rawValue,
                                             userId: userId)
        try await fetchTodos()
        self.setShowSheet(false)
    }
    
    func deleteInProgress(at offset: IndexSet) {
        let tmpTodos:[Todo] = self.todos.filter({!$0.done})
        offset.forEach { i in
            guard let todoId = tmpTodos[i].id else {
                return
            }

            //remove from db
            let urlString = Constants.baseURL + Endpoint.todos + "/\(todoId)"
            
            guard let url = URL(string: urlString) else {
                return
            }
            guard let userId:UUID = self.user.id else {
                return
            }
            Task {
                do {
                    try await HttpClient.shared.delete(at: todoId, url: url, userId: userId)
                    
                    try await fetchTodos()
                } catch {
                    print("❌ Error:\(error)")
                }
            }
        }
    }
    
    func deleteComplete(at offset: IndexSet) {
        let tmpTodos:[Todo] = self.todos.filter({$0.done})
        offset.forEach { i in
            guard let todoId = tmpTodos[i].id else {
                return
            }

            //remove from db
            let urlString = Constants.baseURL + Endpoint.todos + "/\(todoId)"
            
            guard let url = URL(string: urlString) else {
                return
            }
            guard let userId:UUID = self.user.id else {
                return
            }
            Task {
                do {
                    try await HttpClient.shared.delete(at: todoId, url: url, userId: userId)
                    
                    try await fetchTodos()
                } catch {
                    print("❌ Error:\(error)")
                }
            }
        }
    }
    
    func helloWorldFunc() -> String {
        return "Hello, world <3"
    }
}
