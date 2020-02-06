export class Mitarbeiter{
    private _name: string;
    private _username: string;
    private _avatar_url: string;
    private _apiUrl : string;
    private _repoUrl: string;
    private _languages :{language: string, counter: number}[] = []; // [{language: "python", counter: 3}]

    constructor(avatar_url?, apiUrl?, repoUrl?, username?, name?, languages = [], ){
      this._avatar_url = avatar_url;
      this._apiUrl = apiUrl;
      this._name = name;
      this._languages = languages;
      this._username =username;
      this._repoUrl = repoUrl;
    }

    addLanguages(languages : string[]){
        for(const language of languages){
            this.addLanguage(language);
        }
    }

    private addLanguage(language){
        console.log(this._languages);
        for(const lan of this._languages){
            if(lan['language'] === language){
                lan['counter']++;
                return;
            }
        }
        this._languages.push({language, counter: 1});
    }

    set name(name){
        this._name = name;
    }

    get name(){
        return this._name;
    }
    set username(name){
        this._username = name;
    }

    get username(){
        return this._username;
    }

    get languages(){
        return this._languages;
    }

    get apiUrl(){
        return this._apiUrl;
    }

    set apiUrl(url: string){
        this._apiUrl = url;
    }
    get repoUrl(){
        return this._repoUrl;
    }

    set repoUrl(url: string){
        this._repoUrl = url;
    }

    set avatar_url(avatar_url : string){
        this._avatar_url = avatar_url;
    }
    
    get avatar_url(){
        return this._avatar_url;
    }

  }