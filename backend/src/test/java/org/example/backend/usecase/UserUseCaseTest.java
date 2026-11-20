package org.example.backend.usecase;

import org.example.backend.domain.model.User;
import org.example.backend.domain.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserUseCaseTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserUseCase userUseCase;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = new User();
        sampleUser.setIdUser("user-1");
        sampleUser.setAccount("reader01");
        sampleUser.setPassword("encodedPassword");
        sampleUser.setRole("guest");
    }

    @Test
    @DisplayName("registerUser - should encode password and register successfully")
    void testRegisterUser_Success() {
        when(userRepository.findByAccount("reader01")).thenReturn(null);
        when(passwordEncoder.encode("rawPass123")).thenReturn("encodedPassword");
        when(userRepository.registerUser("reader01", "encodedPassword")).thenReturn(sampleUser);

        User registered = userUseCase.registerUser("reader01", "rawPass123");

        assertNotNull(registered);
        assertEquals("reader01", registered.getAccount());
        verify(userRepository, times(1)).findByAccount("reader01");
        verify(userRepository, times(1)).registerUser("reader01", "encodedPassword");
    }

    @Test
    @DisplayName("registerUser - should throw when account already exists")
    void testRegisterUser_AccountExists() {
        when(userRepository.findByAccount("reader01")).thenReturn(sampleUser);

        assertThrows(RuntimeException.class, () -> userUseCase.registerUser("reader01", "rawPass123"));
        verify(userRepository, never()).registerUser(anyString(), anyString());
    }

    @Test
    @DisplayName("login - should succeed with valid credentials")
    void testLogin_Success() {
        when(userRepository.findByAccount("reader01")).thenReturn(sampleUser);
        when(passwordEncoder.matches("rawPass123", "encodedPassword")).thenReturn(true);

        User loggedIn = userUseCase.login("reader01", "rawPass123");

        assertNotNull(loggedIn);
        assertEquals("reader01", loggedIn.getAccount());
    }

    @Test
    @DisplayName("login - should throw when account not found")
    void testLogin_AccountNotFound() {
        when(userRepository.findByAccount("unknown")).thenReturn(null);

        assertThrows(RuntimeException.class, () -> userUseCase.login("unknown", "pass"));
    }

    @Test
    @DisplayName("login - should throw when password mismatch")
    void testLogin_WrongPassword() {
        when(userRepository.findByAccount("reader01")).thenReturn(sampleUser);
        when(passwordEncoder.matches("wrongPass", "encodedPassword")).thenReturn(false);

        assertThrows(RuntimeException.class, () -> userUseCase.login("reader01", "wrongPass"));
    }
}
