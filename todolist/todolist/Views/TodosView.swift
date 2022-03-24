//
//  TodosView.swift
//  todolist
//
//  Created by Nuttapon Buaban on 22/3/2565 BE.
//

import SwiftUI

struct TodosView: View {
    
    @StateObject var viewModel = TodosViewModel()
    
    var body: some View {
        NavigationView {
            List {
                // add section
                Section {
                    TextField("Type some task...", text: $viewModel.newTodoString)
                        .disableAutocorrection(true)
                        .onSubmit{
                            viewModel.create()
                        }
                } header: {
                    Text("Add")
                }
                // in progress
                Section {
                    ForEach(viewModel.todos.filter({!$0.status})) { todo in
                        Button(action: {
                            viewModel.setShowSheet(true)
                            viewModel.selectedTodoId = todo.id
                        }) {
                            Text(todo.text)
                        }.foregroundColor(Color(.label))
                    }
                    .onDelete(perform: viewModel.deleteInProgress)
                } header: {
                    Text("In Progress")
                }
                // complete
                Section {
                    ForEach(viewModel.todos.filter({$0.status})) { todo in
                        Button(action: {
                            
                        }) {
                            Text(todo.text)
                                .strikethrough()
                        }.foregroundColor(Color(.label))
                    }
                    .onDelete(perform: viewModel.deleteComplete)
                } header: {
                    Text("Complete")
                }
            }
            .toolbar{
                if viewModel.newTodoString.count > 0 {
                    Button{
                        hideKeyboard()
                        viewModel.create()
                    } label: {
                        Text("Done")
                    }
                }
            }
            .navigationTitle("Anodos 📔")
        }
        .actionSheet(isPresented: $viewModel.isShowSheet, content: {
            ActionSheet(
                title: Text("Todo Actions"),
                message: nil,
                buttons: [
                    ActionSheet.Button.default(Text("Mark as Complete")) {
                        viewModel.update()
                    }, ActionSheet.Button.cancel({
                        viewModel.setShowSheet(false)
                    })])
        })
        .onAppear {
            viewModel.initialApp()
        }
    }
}

struct TodosView_Previews: PreviewProvider {
    static var previews: some View {
        TodosView().previewDevice("iPhone 12 mini")
    }
}

