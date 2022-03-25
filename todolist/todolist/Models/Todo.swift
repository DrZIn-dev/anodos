//
//  Todo.swift
//  todolist
//
//  Created by Nuttapon Buaban on 22/3/2565 BE.
//

import Foundation

struct Todo: Identifiable, Codable {
    let id: UUID?
    var text: String
    var status: Bool
}
