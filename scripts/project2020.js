// YOUR NAME HERE

// === constants ===
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// === global variables  ===
// the total cost of selected products 
var total = 0;
var prod_achat = {};


// function called when page is loaded, it performs initializations 
var init = function () {
	createShop();
	
	// TODO : add other initializations to achieve if you think it is required
}
window.addEventListener("load", init);



// usefull functions

/*
* create and add all the div.produit elements to the div#boutique element
* according to the product objects that exist in 'catalog' variable
*/
var createShop = function () {
	var shop = document.getElementById("boutique");
	for(var i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
var createProduct = function (product, index) {
	// build the div element for product
	var block = document.createElement("div");
	block.className = "produit";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));
	
	// /!\ should add the figure of the product... does not work yet... /!\ 
	block.appendChild(createFigureBlock(product.description,product.image));

	// build and add the div.description part of 'block' 
	block.appendChild(createBlock("div", product.description, "description"));
	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
var createBlock = function (tag, content, cssClass) {
	var element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product
*
* TODO : add the event handling, 
*   /!\  in this version button and input do nothing  /!\  
*/
var createOrderControlBlock = function (index) {
	var control = document.createElement("div");
	control.className = "controle";

	// create input quantity element
	var input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();
	
	//part to force user to get a quantity between 0 and 9 
	input.addEventListener("keyup" , function (){
		if (input.value>9 || input.value <= 0  ) {
			input.value=0;
		}
		
	});
	input.addEventListener("change" , function(){
		interdiction(input.value,index); // for opcaity , enabling / disabling button
	});

	// add input to control as its child
	control.appendChild(input);
	
	// create order button
	var button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;

	//add the product function
	button.addEventListener("click",function(){
		if(input.value != '0'){
			var quantity = document.getElementById(index+"-"+inputIdKey);
			prod_achat[index  + "id"] = index;
			prod_achat[index  + "price"] = catalog[index].price;
			prod_achat[index + "image"] = catalog[index].image;
			prod_achat[index + "name"] = catalog[index].name;
			prod_achat[index + "description"] = catalog[index].description;

			if(prod_achat[index + "quantity" ] != null ){
				prod_achat[index + "quantity"] += parseInt (quantity.value);
				//refresh
			}
			else {
				prod_achat[index + "quantity"] = parseInt ( quantity.value );
				//refresh
			}
			createAchat(prod_achat , index);
			refreshAchats();
		}

		//alert(index +" qt = " + quantity.value + "product  "+index +"quantity is "  + prod_achat[index + "quantity"] + " x " +  prod_achat[index + "price"]);
	}); 

	// add control to control as its child
	control.appendChild(button);
	
	 


	// the built control div node is returned
	return control;
}


/*
* create and return the figure block for this product
* see the static version of the project to know what the <figure> should be
* @param product (product object) = the product for which the figure block is created
*
* TODO : write the correct code
*/
var createFigureBlock = function (description,source) {
	// this is absolutely not the correct answer !
	//<figure><img src="images/nounours1.jpg" alt="Nounours marron"></figure>
	var image = '<img src="'+source+'" alt="'+description+'" />';
	

	// TODO 
	return createBlock("figure", image);
}

// filtre 

document.addEventListener("DOMContentLoaded", function(event) { 
		
	filtrer();


	loadData();

  });


// a function that allows the user to see the searched products 
function filtrer(){
	var filtre = document.getElementById("filter");
	//alert("hello");
	filtre.addEventListener("keyup" ,function () {
		
			var input = filtre.value;

			if(input != ""){
				//alert(input);
				var shop = document.getElementById("boutique");
				shop.innerHTML = "";
				for(var i = 0; i < catalog.length; i++) {
					if(catalog[i].name.toLowerCase().includes(input.toLowerCase())){
						shop.appendChild(createProduct(catalog[i], i));
					}
					
				}
			}else{
				createShop();
			}
		} );


}


function loadData(){
	// Retrieve the object from storage
	var data = localStorage.data;
	console.log(" hello "+data);
	if(data != null){
	prod_achat = JSON.parse(data);
	console.log('prod: ', prod_achat);
	refreshAchats();
	}
}
// this funciton disables or enables the buttons depending on the quantity 
function interdiction(input,index){
	
	//alert(input + index);
	
	var button = document.getElementById(index+"-"+orderIdKey);
	
	if(input <= 0 || input >9 ){
		button.disabled = true;
		button.style.opacity = 0.25;
	}else{
		button.disabled = false;
		button.style.opacity = 1;	
	}

}

var createAchatBlock = function (product, index) {
	
	
	// build the div element for product
	var block = document.createElement("div");
	block.className = "achat";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createFigureBlock(product[index+"description"],product[index+"image"]));

	block.appendChild(createBlock("h4", product[index+"name"]));
	//add quantity 
	block.appendChild(createBlock("div", product[index+"quantity"] , "quantite"));
	// add price block
	block.appendChild(createBlock("div", product[index+"price"], "prix"));
	
	block.appendChild(createRemoveControlBlock(index));

	return block;
}

function createAchat(product, index) {

	var achats  = document.getElementsByClassName("achats")[0];
	//alert(achats);
	
		achats.appendChild(createAchatBlock(product,index));
	
}

function createRemoveControlBlock(index){

	var control = document.createElement("div");
	control.className = "controle";

	// create input quantity element
	var input = document.createElement("button");
	input.className = "retirer";
	input.id = index+"-remove";
	
	input.addEventListener("click" , function(){

		prod_achat[index  + "id"] = null;
		prod_achat[index  + "price"] = null;
		prod_achat[index + "image"] = null;
		prod_achat[index + "name"] = null;
		prod_achat[index + "description"] = null;
		prod_achat[index + "quantity"] = null;

		refreshAchats();
	
	});

	control.appendChild(input);

	return control;
}

function refreshAchats(){
	total = 0;
	storage_data = {};
	var achats  = document.getElementsByClassName("achats")[0];
	achats.innerHTML = "";
	for (i = 0 ; i < catalog.length ; i ++){
		if (prod_achat[i+"id"]!=null){
			achats.appendChild(createAchatBlock(prod_achat,i));
			total += parseInt(prod_achat[i+"quantity"]) * parseInt(prod_achat[i+"price"]);
			storage_data[i+"id"] = i;
			storage_data[i+"name"] =  prod_achat[i+"name"];
			storage_data[i+"image"] =  prod_achat[i+"image"];
			storage_data[i+"price"] =  prod_achat[i+"price"];
			storage_data[i+"quantity"] =  prod_achat[i+"quantity"];
			storage_data[i+"description"] =  prod_achat[i+"description"];
		}
	}
	var total_price = document.getElementById("montant");
	total_price.innerHTML = total;
	//concerne la question 9 
	storeData(storage_data);
}

function storeData(data){

	localStorage.data = JSON.stringify(data);
//	localStorage.setItem("data" , JSON.stringify(data));

}