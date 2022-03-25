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
    
    func fetchTodos() {
        //fetch todos
    }
    
    func setShowSheet(_ isShow:Bool) {
        self.isShowSheet = isShow
    }
    
    func create() {
        let todo: Todo = Todo(id: UUID(), text: self.newTodoString, status: false)
        self.todos.append(todo)
        self.newTodoString = ""
    }
    
    func update() {
        for i in 0..<self.todos.count {
            if self.todos[i].id == self.selectedTodoId {
                self.todos[i].status = true
                self.setShowSheet(false)
            }
        }
    }
    
    func deleteInProgress(at offset: IndexSet) {
        let tmpTodos:[Todo] = self.todos.filter({!$0.status})
        offset.forEach { i in
            guard let todoId = tmpTodos[i].id else {
                return
            }
            
            //remove from db
            self.todos.removeAll(where: {$0.id == todoId})
        }
    }
    
    func deleteComplete(at offset: IndexSet) {
        let tmpTodos:[Todo] = self.todos.filter({$0.status})
        offset.forEach { i in
            guard let todoId = tmpTodos[i].id else {
                return
            }
            
            //remove from db
            self.todos.removeAll(where: {$0.id == todoId})
        }
    }
}
