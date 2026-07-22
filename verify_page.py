import asyncio
# pyrefly: ignore [missing-import]
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:8080/")
        await page.wait_for_timeout(3000)
        
        # Get tourist list text
        cards = await page.query_selector_all(".flex.min-w-0.flex-1.flex-col .border-b")
        print("=== TOURIST LIST ===")
        for idx, card in enumerate(cards):
            text = await card.inner_text()
            print(f"Card {idx}: {repr(text)}")
            
        # Get drivers list
        print("\n=== NAVIGATING TO DRIVERS ===")
        await page.click("text=Drivers & Guides")
        await page.wait_for_timeout(1000)
        drivers = await page.query_selector_all(".grid.gap-4 .group")
        for idx, d in enumerate(drivers):
            text = await d.inner_text()
            print(f"Driver {idx}: {repr(text)}")
            
        await browser.close()

asyncio.run(main())
