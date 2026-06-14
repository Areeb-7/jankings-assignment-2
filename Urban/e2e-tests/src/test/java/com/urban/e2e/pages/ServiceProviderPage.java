package com.urban.e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class ServiceProviderPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    public ServiceProviderPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public void waitForPageToLoad(String serviceName) {
        wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//h2[contains(text(), 'Service Providers for') or contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '" + serviceName.toLowerCase() + "')]")
        ));
    }

    public boolean hasProviders() {
        List<WebElement> rows = driver.findElements(By.xpath("//table/tbody/tr"));
        if (rows.isEmpty()) return false;
        
        // If there's a row, check if it's the "No service providers found" fallback row
        String text = rows.get(0).getText();
        return !text.contains("No service providers found");
    }

    public void clickFirstProvider() {
        WebElement firstRow = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//table/tbody/tr[not(contains(., 'No service providers found'))]")
        ));
        firstRow.click();
    }
}
