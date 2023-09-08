export enum Attribute {
    "name" = "name",
    "images" = "images",
    "team" = "team",
    "champions" = "champions",
    "country" = "country"
    
}

class Profile extends HTMLElement{
    
    name?: string;
    images?:string
    team?: string;
    champions?: number;
    country?: string;
    
    static get observedAttributes(){
        const attrs: Record<Attribute,null> = {
            country: null,
            team: null,
            champions: null,
            images:null,
            name: null
        }
        return Object.keys(attrs); 
    }
    
    attributeChangedCallback(propName:Attribute,oldValue: string | undefined,newValue: string | undefined){
        switch(propName){
            case Attribute.champions:
                
                this.champions = newValue ? Number(newValue) : undefined;
            break;

            default: 
            this[propName] = newValue;
            break;
        }
        
        this.render();
    }
    
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    
    connectedCallback(){
        this.render();
    }
    
    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <section>
            <link rel="stylesheet" href="../src/components/Profile/profile.css">
            <h1>${this.name}</h1>
            <img src=${this.images}></img>
            <p>Team: ${this.team}</p>
            <p>Champions: ${this.champions}</p>
            <p>From: ${this.country}</p>
            <button>Like</button>

            </section>
            `
        }
    }
}

customElements.define("my-profile",Profile);
export default Profile;