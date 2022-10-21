//Header
class CustomHeader extends HTMLElement {
    connectedCallback() {
            this.innerHTML = `
            <div id="header">
                <h1>Hello how</h1>
            </div>
            `
    }
}
customElements.define('header-main',CustomHeader);

//Footer
class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="footer">
                <h1>Hello how</h1>
            </div>
            `
    }
}
customElements.define('footer-main',CustomFooter);