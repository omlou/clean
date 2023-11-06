## Langue

* [English](https://github.com/omlou/clean#readme)
* [简体中文](https://github.com/omlou/clean/blob/master/docs/md/readme-zh.md)
* [日本語](https://github.com/omlou/clean/blob/master/docs/md/readme-ja.md)
* [한국어](https://github.com/omlou/clean/blob/master/docs/md/readme-ko.md)
* [Français](https://github.com/omlou/clean/blob/master/docs/md/readme-fr.md)

## Introduction

* Clean est une boîte à outils frontend pour faciliter le développement.

## Utilisation

### Inclure via une balise de script

```html
<script src="https://unpkg.com/@xlou/clean@1.0.0/dist/umd/clean.min.js"></script>
<!-- Il est recommandé de télécharger localement et d'utiliser -->
<script>
  /* Après avoir inclus ce fichier JS, l'objet C sera disponible globalement */
  C("#app").render(`<div>Hello, World!</div>`)
</script>
```

### Inclure dans un projet Node

Installer

``` bash
npm i @xlou/clean
```

Utiliser

```javascript
import C from '@xlou/clean'

C("#app").render(`<div>Hello, World!</div>`)
```

## API

### Méthode C

Transforme les DOM correspondants aux sélecteurs CSS en objets Clean.

Utilisation :

```javascript
C("#app").render(`<div>Hello, World!</div>`)
C("#app", C.one(".mydiv")) // Rechercher dans .mydiv

/* L'objet Clean renvoyé est semblable à un tableau, et vous pouvez le convertir en objet DOM en utilisant l'indice */
C("#app")[0]

/* Utiliser les méthodes sous C */
C.mounted(function () {
  /* ... */
})
C.ajax(/* ... */)
```

### Getter (Obtenir un élément, convertir en tableau)

Le résultat est un objet Clean.

Prenons l'exemple de l'obtention de l'élément parent :

```javascript
C("#app").parent
```

#### parent

Obtient l'élément parent de la cible.

Si l'objet Clean cible contient plusieurs éléments DOM, seul le premier élément est pris en compte.

```typescript
get parent(): Clean;
```

#### child

Obtient tous les éléments enfants de la cible.

Si l'objet Clean cible contient plusieurs éléments DOM, seul le premier élément est pris en compte.

```typescript
get child(): Clean;
```

#### next

Obtient l'élément suivant de la cible.

La cible de l'objet Clean peut contenir plusieurs éléments DOM.

```typescript
get next(): Clean;
```

#### prev

Obtient l'élément précédent.

La cible de l'objet Clean peut contenir plusieurs éléments DOM.

```typescript
get prev(): Clean;
```

#### first

Obtient le premier élément parmi les éléments enfants.

La cible de l'objet Clean peut contenir plusieurs éléments DOM.

```typescript
get first(): Clean;
```

#### last

Obtient le dernier élément parmi les éléments enfants.

La cible de l'objet Clean peut contenir plusieurs éléments DOM.

```typescript
get last(): Clean;
```

#### array

Renvoie un objet Clean converti en tableau.

```typescript
get array(): Array<Element>;
```

### Getter et Setter (Obtenir une propriété, définir une propriété)

Prenons l'exemple de l'obtention de styles et de la définition de styles en ligne :

```javascript
/* Obtenir */
let style = C("#app").style

/* Définir */
C("#app").style = "font-size: 14px;"
```

#### style

Obtient et définit les styles de l'élément.

Si l'objet Clean cible contient plusieurs éléments DOM, seul le premier élément est pris en compte.

La valeur peut être une chaîne CSS, par exemple "display:none;", ou un objet { display: none, fontSize: "20px" }.

```typescript
get style(): string;
set style(value: any);
```

#### value

Obtient et définit la valeur des éléments de formulaire.

Si l'objet Clean cible contient plusieurs éléments DOM, seul le premier élément est pris en compte.

```typescript
get value(): any;
set value(value: any);
```

#### checked

Obtient et définit l'état coché des boutons radio ou des cases à cocher.

Si l'objet Clean cible contient plusieurs éléments DOM, seul le premier élément est pris en compte.

```typescript
get checked(): boolean | undefined;
set checked(value: boolean);
```

#### text

Obtient et modifie la propriété innerText de l'élément.

Si l'objet Clean cible contient plusieurs éléments DOM, seul le premier élément est pris en compte.

```typescript
get text(): string;
set text(value: any);
```

### Méthodes de l'objet Clean

#### nth

Obtient un élément à partir de l'objet Clean en fonction de l'indice et renvoie toujours un objet Clean.

```javascript
C("#app").nth(0)
```

Explication :

```typescript
nth: (index: number) => Clean;
```

#### map

Parcourt l'objet Clean et renvoie un tableau de même longueur.

```javascript
C("#app").map((item, i) => {
  /* ... */
  return i
}) // [0]
```

Explication :

```typescript
map: (callback: (item: Clean, i: string) => any) => Array<any>;
```

#### push

Ajoute des éléments DOM à l'objet Clean.

```javascript
let divs = C(".app")
divs.push(C.one(".myapp"))
```

Explication :

```typescript
push: (dom: Element) => void;
```

#### concat

Concatène des objets Clean ou des objets NodeList, etc.

```javascript
C("#app").concat(C(".mydiv"), C.all(".hello"))
```

Explication :

```typescript
concat: (...arg: any) => void;
```

#### render

Rend du HTML dans un conteneur.

```typescript
render: (str: string) => void;
```

Explication :

```javascript
C("#app").render(`<div>Hello, World!</div>`)
```

La cible prend en charge plusieurs éléments DOM dans l'objet Clean.

Le paramètre est une chaîne HTML.

Les autres méthodes de manipulation des éléments DOM peuvent être utilisées de la même manière que render.

#### append

Ajoute du HTML à la fin d'un conteneur.

```typescript
append: (str: string) => void;
```



#### prepend

Ajoute du HTML au début d'un conteneur.

```typescript
prepend: (str: string) => void;
```

#### before

Ajoute du HTML avant un élément.

```typescript
before: (str: string) => void;
```

#### after

Ajoute du HTML après un élément.

```typescript
after: (str: string) => void;
```

#### remove

Supprime un élément cible.

```typescript
remove: () => void;
```

#### show

Affiche un élément.

```javascript
C("#app").show()
C("#app").show("block") // Le type est facultatif, par défaut, c'est ""
```

Explication :

```typescript
show: (type?: string | undefined) => void;
```

#### hide

Cache un élément en définissant le style sur display:none;.

Explication :

```typescript
hide: () => void;
```

#### getAttr

Obtient la valeur d'un attribut de l'élément.

Cette méthode prend le premier élément en compte si l'objet Clean cible contient plusieurs éléments DOM.

```javascript
C("#app").getAttr("id")
```

Explication :

```typescript
getAttr: (attr: string) => string | null; // attr est le nom de l'attribut
```

#### setAttr

Définit la valeur d'un attribut de l'élément.

```javascript
C("#app").setAttr("data", 1)
```

Explication :

```typescript
setAttr: (attr: string, value: any) => void; // attr est le nom de l'attribut et value est la valeur de l'attribut
```

#### addClass

Ajoute une classe à un élément.

Explication :

```typescript
addClass: (name: string) => void; // name est le nom de la classe à ajouter
```

#### removeClass

Supprime une classe spécifique d'un élément.

Explication :

```typescript
removeClass: (name: string) => void;
```

#### hasClass

Vérifie si un élément possède une classe spécifiée et renvoie un booléen.

Cette méthode prend le premier élément en compte si l'objet Clean cible contient plusieurs éléments DOM.

```javascript
C("#app").hasClass("hello")
```

Explication :

```typescript
hasClass: (name: string) => boolean;
```

#### bind

Lie un écouteur d'événements.

```javascript
C("#app").bind("click", function(){
  console.log("click")
}, false)
```

Explication :

```typescript
bind: (type: string, callback: Function, option: any) => void;
/* 
  type : type d'événement
  callback : méthode d'événement à lier
  option : option d'écoute d'événement (facultatif)
*/
```

#### unbind

Supprime un écouteur d'événements.

```javascript
C("#app").unbind("click", sayHello)
```

Explication :

```typescript
unbind: (type: string, callback: Function, option: any) => void;
/* 
  type : type d'événement
  callback : méthode d'événement à supprimer (doit être une variable, ne peut pas être une fonction anonyme)
*/
```

### Méthodes de l'objet C

#### create

Transforme le DOM en un objet Clean

```javascript
C.create(C.createDOM(`<div>Hello, World!</div>`))
```

Description :

```typescript
create: (node: any) => Clean | undefined;
/* node peut être un élément DOM unique, une liste de nœuds NodeList ou un tableau d'objets DOM */
```

#### createDOM

Transforme une chaîne HTML en un tableau contenant des objets DOM

```javascript
C.createDOM(`<div>Hello, World!</div>`)
```

Description :

```typescript
createDOM: (str: string) => Element[];
```

#### htmlCir

Parcourt un tableau ou un objet pour générer une chaîne HTML

```javascript
let arr = [
  { name: "tom", content: "hello" },
  { name: "lili", content: "are you ok" }
]
C("#app").render(C.htmlCir(arr, (item, i) => {
  return `
    <div>
      <div class="name">${item.name}</div>
      <div class="content">${item.content}</div>
    </div>
  `
}))
```

Description :

```typescript
htmlCir: (obj: any, callback: (item: any, i: any) => string) => string;
/* 
  obj est le tableau ou l'objet à parcourir, item est la clé et i est l'indice
  Retourne une chaîne HTML
*/
```

#### str

Utilisé pour lier des propriétés et passer des paramètres dans les chaînes de modèle

Seuls les paramètres de type objet et chaîne doivent être traités avec str(). Les autres types peuvent être directement transmis.

```javascript
let arr = [
  { name: "tom", age: 18 },
  { name: "lili", age: 25 }
]
C("#app").render(C.htmlCir(arr, (item, i) => {
  return `
    <div onclick="sayHello(${C.str(item)})">
      <div class="name" onclick="sayName(${C.str(item.name)})">${item.name}</div>
      <div class="age" onclick="sayAge(${item.age})">${item.age}</div>
    </div>
  `
}))

/*
  Lorsque le paramètre est un objet, les clés de type Function, Symbol et RegExp de l'objet ne peuvent pas être transmises
  Dans ce cas, les clés peuvent être utilisées pour transmettre des paramètres
*/
let obj = {
  name: "tom",
  say: function (str) {
    console.log("hello" + str)
  },
  [Symbol("hobby")]: "swim"
}
C("#app").render(C.htmlCir(obj, (item, i) => {
  return `
    <div onclick="${C.str(obj.say)}('tom')">${C.str(i)}-${C.str(item)}</div>
  `
}))
```

Description :

```typescript
str: (arg: any) => string;
```

#### one

Sélectionne un DOM en fonction d'un sélecteur CSS et renvoie un objet DOM

Équivalent à querySelector()

```javascript
C.one(".mydiv")
```

Description :

```typescript
one: (target: any, range: any) => Element;
/* target: sélecteur CSS, range: plage de recherche */
```

#### all

Sélectionne plusieurs DOM en fonction d'un sélecteur CSS et renvoie un tableau

Contrairement à querySelectorAll(), cette méthode renvoie un tableau

```javascript
C.all(".mydiv,.hello")
```

Description :

```typescript
all: (target: any, range: any) => Element[];
/* target: sélecteur CSS, range: plage de recherche */
```

#### setState

Ajoute des variables globales

```javascript
const data = {
  id: 1,
  name: "Tom",
  age: 18,
  hobby: "swim"
}
C.setState(data) // Toutes les propriétés de data deviendront des variables globales
C.setState(data, "name,age") // Seules les propriétés name et age sont élevées en tant que variables globales
```

Description :

```typescript
setState: (obj: any, str?: string | undefined) => void;
```

#### proxy

Écoute les modifications de la valeur d'une propriété d'un objet donné

```javascript
const data = {
  name: "Tom",
  age: 18
}
let dataProxy = C.proxy(data, {
  name: {
    handler(nv, ov) {
      C(".name").value = nv
    },
    immediate: true
  }
})
```

Description :

```typescript
proxy(conta: any, arg: {
  [prop: string | number | symbol]: {
    handler: (nv: any, ov: any) => any;
    immediate?: boolean | undefined;
  };
}): void;
/* Si immediate: true est spécifié, le gestionnaire sera exécuté une fois lors de l'ajout de l'auditeur */
```

#### mounted

Crochet de fonction appelé lorsque la construction de la page est terminée, à l'exclusion du chargement d'images et d'autres ressources réseau

```javascript
C.mounted(function() {
  console.log("mounted")
})
```

Description :

```typescript
mounted: (callback: (event: Event | null) => any) => void;
```

#### loaded

Crochet de fonction appelé lorsque la page est chargée

Description :

```typescript
loaded: (callback: (event: Event) => any) => void;
```

#### beforeUnload

Crochet de fonction appelé avant la fermeture de la page

```javascript
C.beforeUnload(function(event) {
  try {
    event.preventDefault()
    event.returnValue = true
  } catch () {}
  /* Lorsque vous essayez de fermer la page et qu'il y a des modifications dans le formulaire de la page, une boîte de dialogue de confirmation s'affiche */
})
```

Description :

```typescript
beforeUnload: (callback: (event: Event) => any) => void;
```

#### visible

Crochet de fonction appelé lorsque la page se ferme, bascule, se réduit ou se minimise

```javascript
C.visible(function(msg) {
  console.log("C.visible", msg.event, msg.state)
  /* state est hidden s'il est caché, visible s'il est affiché */
})
```

Description :

```typescript
visible: (callback: (event: {
  event: Event;
  state: string;
}) => any) => void;
```

#### pageShow

Crochet de fonction appelé lorsque la page est affichée

Description :

```typescript
pageShow: (callback: (event: PageTransitionEvent) => any) => void;
/* Utilisez event.persisted pour vérifier si le document est chargé à partir du cache */
```

#### pageHide

Cro

chet de fonction appelé lorsque la page est masquée

Description :

```typescript
pageHide: (callback: (event: PageTransitionEvent) => any) => void;
```

#### prevent

Empêche l'événement par défaut

```html
<a class="hello" onclick="C.prevent(sayHello, event, 123)">Cliquez</a>
```

Description :

```typescript
prevent: (callback: Function, ev: Event, ...arg: any) => void;
/* callback est la méthode à lier, ev est l'objet événement, arg est le paramètre à transmettre à la méthode */
```

#### stop

Empêche la propagation de l'événement

Description :

```typescript
stop: (callback: Function, ev: Event, ...arg: any) => void;
```

#### self

Le déclencheur se produit uniquement si la cible est elle-même

Description :

```typescript
self: (callback: Function, ev: Event, ...arg: any) => void;
```

#### push

Conserve l'historique et navigue vers une page

```javascript
C.push("./page/home.html?id=1")
C.push({
  url: "./page/home.html",
  query: {
    id: 1
  },
  params: {
    name: "tom",
    age: 18
  }
})
```

Description :

```typescript
push: (msg: any) => void;
```

#### replace

Remplace la page actuelle sans conserver l'historique

Description :

```typescript
replace: (msg: any) => void;
```

#### reload

Recharge la page actuelle

Description :

```typescript
reload: () => void;
```

#### back

Revenir à la page d'historique précédente

Description :

```typescript
back: () => void;
```

#### forward

Avancer vers la page d'historique suivante

Description :

```typescript
forward: () => void;
```

#### go

Accéder à une page de l'historique

```javascript
C.go(-1) // Revenir en arrière d'une page, c'est-à-dire revenir à la page précédente
C.go(1) // Avancer d'une page
```

Description :

```typescript
go: (index: number) => void;
/* index représente le nombre de pages à naviguer, un nombre négatif signifie les pages précédentes, un nombre positif signifie les pages suivantes */
```

#### route

Obtient les paramètres de la route

```javascript
const route = C.route()
```

Description :

```typescript
route: () => {
  params: any;
  query: any;
};
```

#### formatInput

Limite l'entrée en utilisant des expressions régulières

Prend en charge plusieurs règles

```javascript
/* Règle unique */
C.formatInput({
  el: "", // Sélecteur CSS, prenant en charge un type d'élément
  reg: "", // L'expression régulière à satisfaire
  nopass: e => {}, // Callback en cas d'échec
  pass: (nv, ov) => {} // Callback en cas de réussite de l'expression régulière, nv est la nouvelle valeur, ov est l'ancienne valeur
})

/* Plusieurs règles */
C.formatInput({
  el: "",
  rules: [
    {
      reg: "",
      nopass: e => {}
    },
    {
      reg: "",
      nopass: e => {}
    }
  ],
  pass: (nv, ov) => {}
})
```

Description :

```typescript
formatInput: (msg: any) => void;
```

#### ajax

Envoie une requête Ajax

Pour des exemples détaillés, veuillez consulter https://github.com/omlou/ajax

#### webtools

Intègre toutes les méthodes de webtools

Pour des exemples d'utilisation, veuillez consulter https://github.com/omlou/webtools

Exemple :

```javascript
C.clipboardWrite("Bonjour, le monde !")
.then(() => {
  console.log("Copie réussie")
})
```

### Description des types

```typescript
import * as _xlou_ajax from '@xlou/ajax';
import * as _xlou_webtools from '@xlou/webtools';

declare const tools: {
    Base64: typeof _xlou_webtools.Base64;
    deepCopy: typeof _xlou_webtools.deepCopy;
    filterObject: typeof _xlou_webtools.filterObject;
    getQuery: typeof _xlou_webtools.getQuery;
    queryString: typeof _xlou_webtools.queryString;
    toFixed: typeof _xlou_webtools.toFixed;
    formSubmit: typeof _xlou_webtools.formSubmit;
    readText: typeof _xlou_webtools.readText;
    readJSON: typeof _xlou_webtools.readJSON;
    getStore: typeof _xlou_webtools.getStore;
    setStore: typeof _xlou_webtools.setStore;
    unid: typeof _xlou_webtools.unid;
    colorRGB: typeof _xlou_webtools.colorRGB;
    clipboardWrite: typeof _xlou_webtools.clipboardWrite;
    ajax: _xlou_ajax.AjaxOptions;
    createDOM: (str: string) => Element[];
    htmlCir: (obj: any, callback: (item: any, i: any) => string) => string;
    str: (arg: any) => string;
    one: (target: any, range: any) => Element;
    all: (target: any, range: any) => Element[];
    setState: (obj: any, str?: string | undefined) => void;
    proxy(conta: any, arg: {
        [prop: string]: {
            handler: (nv: any, ov: any) => any;
            immediate?: boolean | undefined;
        };
        [prop: number]: {
            handler: (nv: any, ov: any) => any;
            immediate?: boolean | undefined;
        };
        [prop: symbol]: {
            handler: (nv: any, ov: any) => any;
            immediate?: boolean | undefined;
        };
    }): void;
    mounted: (callback: (event: Event | null) => any) => void;
    loaded: (callback: (event: Event) => any) => void;
    beforeUnload: (callback: (event: Event) => any) => void;
    visible: (callback: (event: {
        event: Event;
        state: string;
    }) => any) => void;
    pageShow: (callback: (event: PageTransitionEvent) => any) => void;
    pageHide: (callback: (event: PageTransitionEvent) => any) => void;
    prevent: (callback: Function, ev: Event, ...arg: any) => void;
    stop: (callback: Function, ev: Event, ...arg: any) => void;
    self: (callback: Function, ev: Event, ...arg: any) => void;
    push: (msg: any) => void;
    replace: (msg: any) => void;
    reload: () => void;
    back: () => void;
    forward: () => void;
    go: (index: number) => void;
    route: () => {
        params: any;
        query: any;
    };
    formatInput: (msg: any) => void;
    create: (node: any) => Clean | undefined;
};
declare const instance: {
    remove: () => void;
    show: (type?: string | undefined) => void;
    hide: () => void;
    getAttr: (attr: string) => string | null;
    setAttr: (attr: string, value: any) => void;
    addClass: (name: string) => void;
    removeClass: (name: string) => void;
    hasClass: (name: string) => boolean;
    bind: (type: string, callback: Function, option: any) => void;
    unbind: (type: string, callback: Function, option: any) => void;
    nth: (index: number) => Clean;
    map: (callback: (item: Clean, i: string) => any) => Array<any>;
    push: (dom: Element) => void;
    concat: (...arg: any) => void;
    render: (str: string) => void;
    append: (str: string) => void;
    prepend: (str: string) => void;
    before: (str: string) => void;
    after: (str: string) => void;
};
type Instance = typeof instance;
interface Clean extends Instance {
    readonly length: number;
    get parent(): Clean;
    get child(): Clean;
    get next(): Clean;
    get prev(): Clean;
    get first(): Clean;
    get last(): Clean;
    get array(): Array<Element>;
    get style(): string;
    set style(value: any);
    get value(): any;
    set value(value: any);
    get checked(): boolean | undefined;
    set checked(value: boolean);
    get text(): string;
    set text(value: any);
}
declare class Clean {
    constructor();
}
type ToolOption = typeof tools;
type CFuncion = (que: string, range?: Document) => Clean;
type COption = CFuncion | ToolOption;
declare const C: COption;

export { COption, Clean, C as default };
```