package com.urban.e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class RegisterPage {
    private final WebDriver driver;
    private final String urlPath = "/createaccount";
    private final String baseUrl;
    private final WebDriverWait wait;

    public RegisterPage(WebDriver driver, String baseUrl) {
        this.driver = driver;
        this.baseUrl = baseUrl;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public void open() {
        driver.get(baseUrl + urlPath);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
    }

    public void register(String username, String email, String password) {
        WebElement nameEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        WebElement emailEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
        WebElement passEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("password")));
        WebElement confirmEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("confirmPassword")));
        nameEl.clear(); nameEl.sendKeys(username);
        emailEl.clear(); emailEl.sendKeys(email);
        passEl.clear(); passEl.sendKeys(password);
        confirmEl.clear(); confirmEl.sendKeys(password);
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[type='submit']"))).click();
    }
}
