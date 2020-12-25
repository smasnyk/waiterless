package com.project.waiterless.configs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.waiterless.models.User;
import com.project.waiterless.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginFilter extends AbstractAuthenticationProcessingFilter {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    protected LoginFilter(String defaultFilterProcessesUrl, AuthenticationManager manager, UserService userService) {
        super(defaultFilterProcessesUrl);
        this.authenticationManager = manager;
        this.userService = userService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException {
        User user = new ObjectMapper().readValue(httpServletRequest.getInputStream(), User.class);
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),
                user.getPassword()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) {
        UserDetails userDetails = userService.loadUserByUsername(authResult.getName());
        StringBuilder tokenSubject = new StringBuilder(userDetails.getUsername());
        for (GrantedAuthority authority : userDetails.getAuthorities()) {
            tokenSubject.append("-");
            tokenSubject.append(authority);
        }
        String token = Jwts.builder()
                .setSubject(tokenSubject.toString())
                .signWith(SignatureAlgorithm.HS512, "yes".getBytes())
                .compact();
        response.addHeader("Authorization", "Bearer" + token);
    }
}
