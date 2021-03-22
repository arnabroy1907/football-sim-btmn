import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    body {
        margin: 0;
        font-size: 16px;
        background-color: #040E49;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    }

    body > div {
        opacity: 1;
    }
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
    }
}`;