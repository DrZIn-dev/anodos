//
//  HttpClient.swift
//  todolist
//
//  Created by Nuttapon Buaban on 4/4/2565 BE.
//

import Foundation

enum HttpMethods: String {
    case POST, GET, PUT, DELETE, PATCH
}

enum MIMEType: String {
    case JSON = "application/json"
}

enum HttpHeaders:String {
    case contentType = "Content-Type"
    case userId = "X-User-Id"
}

enum HttpError: Error {
    case badURL, badResponse, errorDecodingData, invalidURL
}

class HttpClient {
    private init() {}
    
    static let shared = HttpClient()
    
    func fetch<T: Codable>(url: URL, userId: UUID) async throws -> [T] {
        var request = URLRequest(url: url)
        
        request.httpMethod = HttpMethods.GET.rawValue
        request.addValue(userId.description, forHTTPHeaderField: HttpHeaders.userId.rawValue)
        
        let (data, response) = try await URLSession.shared.data(for: request)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else {
            throw HttpError.badResponse
        }
        
        guard let object = try? JSONDecoder().decode([T].self, from: data) else {
            throw HttpError.errorDecodingData
        }
        
        return object
    }
    
    func sendData<T: Codable>(to url: URL, object:T, httpMethod:String, userId: UUID) async throws {
        var request = URLRequest(url: url)
        
        request.httpMethod = httpMethod
        request.addValue(MIMEType.JSON.rawValue, forHTTPHeaderField: HttpHeaders.contentType.rawValue)
        request.addValue(userId.description, forHTTPHeaderField: HttpHeaders.userId.rawValue)
        print("str \(userId.description)")
        request.httpBody = try? JSONEncoder().encode(object)
        
        let (_, response) = try await URLSession.shared.data(for: request)
        print(response)
        guard (response as? HTTPURLResponse)?.statusCode == 200 || (response as? HTTPURLResponse)?.statusCode == 201 else {
            throw HttpError.badResponse
        }
    }
    
    func delete(at id:UUID, url:URL, userId: UUID) async throws {
        var request = URLRequest(url: url)
        
        request.httpMethod = HttpMethods.DELETE.rawValue
        request.addValue(userId.description, forHTTPHeaderField: HttpHeaders.userId.rawValue)
        
        let (_, response) = try await URLSession.shared.data(for: request)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else {
            throw HttpError.badResponse
        }
    }
}
