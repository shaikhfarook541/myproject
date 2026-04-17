import{test, expect} from "@playwright/test";
import { isGeneratorObject } from "node:util/types";



test("title",()=>{
     

})



test("verify page title",async({page})=>{
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
let title:string= await page.title();
console.log("tile:",title);
 

await expect (page).toHaveTitle("rahul");

})