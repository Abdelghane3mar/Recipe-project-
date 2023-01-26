let inpSearch = document.getElementById("inpSearch") ;
let btnSearch = document.getElementById("btnSearch") ;
let apiRequest = []
let recipeDetails  = {}


async function getRequest(term)
{
    let request  = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`) ;
    request =  await request.json()
    apiRequest = request.recipes ;
    displayGetRequest()

}


function displayGetRequest()
{
    let cartonna = `` ;


    for(let i = 0 ; i < apiRequest.length  ; i++)
    {
        let myId = "'"+apiRequest[i].recipe_id+"'" ;

        cartonna += `<div class="col-md-4">
                                                <div class="item py-2 "  onclick="getRecipeDetails(${myId})">
                                                    <img class="w-100" src="${apiRequest[i].image_url}" alt="">
                                                    <h3 class="color">${apiRequest[i].title}</h3>
                                                    <span>${apiRequest[i].publisher}</span>
                                                </div>
                                            </div>` ;
    }
    document.getElementById("request").innerHTML = cartonna ; 
}

btnSearch.addEventListener("click" , function(){

    getRequest(inpSearch.value) ;
    inpSearch.value = "" ;


})
inpSearch.addEventListener("keydown" , function(eventInput){

    if(eventInput.code ==  "Enter")
    {
        getRequest(inpSearch.value) ;
        inpSearch.value = "" ;

    }

})

async function getRecipeDetails (id)
{
    let request  = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`) ;
    request =  await request.json()
    recipeDetails  = request.recipe ;
    displayRecipeDetails()
}

function displayRecipeDetails()
{
    let cartoona2 = `` ;
    
    for (let x of recipeDetails.ingredients) {
        cartoona2 +=` <li class="d-flex py-1 align-items-center font-weight-bolder"><span class="fa-li"><i class="fas fa-utensil-spoon"></i></span>${x}</li>   `;    }
  
        let cartonna = `<div class=" item recipeDetails">
                                                <h3 class="color">${recipeDetails.title}</h3>
                                                <img class="   py-1 w-100" src="${recipeDetails.image_url}" alt="">
                                                <span >${recipeDetails.publisher} :</span>
                                                <ul class = "fa-ul py-3">${cartoona2}</ul>
                                            </div>` ;

document.getElementById("recipeDetails").innerHTML = cartonna ;
}

