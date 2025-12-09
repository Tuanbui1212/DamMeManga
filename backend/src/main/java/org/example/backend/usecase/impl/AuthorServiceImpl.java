// package org.example.backend.usecase.impl;

// import org.example.backend.domain.model.Author;
// import org.example.backend.domain.repository.AuthorRepository;
// import org.example.backend.usecase.AuthorService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class AuthorServiceImpl implements AuthorService {

//     @Autowired
//     private AuthorRepository authorRepository;

//     @Override
//     public List<Author> getAllAuthors() {
//         return authorRepository.findAll();
//     }

//     @Override
//     public Optional<Author> getAuthorById(String id) {
//         return authorRepository.findById(id);
//     }

//     @Override
//     public Author createAuthor(Author author) {
//         return authorRepository.save(author);
//     }

//     @Override
//     public Author updateAuthor(String id, Author author) {
//         return authorRepository.findById(id)
//                 .map(existingAuthor -> {
//                     existingAuthor.setNameAuthor(author.getNameAuthor());
//                     return authorRepository.save(existingAuthor);
//                 })
//                 .orElseThrow(() -> new RuntimeException("Author not found with id: " + id));
//     }

//     @Override
//     public void deleteAuthor(String id) {
//         authorRepository.deleteById(id);
//     }
// }
