package com.qa.CVManager.Interoprability.Rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.CVManager.Business.Service.UserService;
import com.qa.CVManager.Persistence.Domain.User;

@RestController
@RequestMapping("/api")
public class LoginRestController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/login/{userNameOfUser}")
	public User login(@PathVariable String userNameOfUser) {
		return userService.getUserByUserName(userNameOfUser);		
	}
	
	@PostMapping("/logout")
	public boolean logout() {
		return true;		
	}
}
