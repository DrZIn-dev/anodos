//
//  Extension.swift
//  todolist
//
//  Created by Nuttapon Buaban on 22/3/2565 BE.
//

import Foundation
import SwiftUI

#if canImport(UIKit)
extension View {
    func hideKeyboard() {
        UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
    }
}
#endif
