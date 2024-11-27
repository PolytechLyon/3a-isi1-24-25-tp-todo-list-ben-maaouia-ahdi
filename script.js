const todoList = document.querySelector('#todo-list');

const newItemTitleInput = document.querySelector('#new-todo-item-title');
const newItemAddButton = document.querySelector('#new-todo-item-add');

const editItemDiv = document.querySelector('#edit-item');
const editItemTitleInput = document.querySelector('#edit-todo-item-title');
const editItemConfirmButton = document.querySelector('#edit-todo-item-confirm');
const editItemCancelButton = document.querySelector('#edit-todo-item-cancel');


// Variable pour suivre l'élément en cours d'édition
let currentEditingItem = null;


// Fonction pour ajouter un élément
function addTodoItem(title) {
    
    // On crée une liste d'élement 
    const listItem = document.createElement('li');

    // Crée un span pour le nom de l'élément
    const span = document.createElement('span');
    span.textContent = title;

    // Bouton Modifier
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => startEditItem(listItem, span)); //Fonction qui va lancer le mode d'édition de l'élement en question

    // Bouton Supprimer
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => listItem.remove()); // Fonction qui va supprimer l'élément de la liste

    // Ajoute l'élément à ajouter, le bouton Supprimer et le bouton Modifier à la liste des éléments
    listItem.appendChild(span);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    // Ajoute la liste des éléments à la liste générale de la TO DO LIST précisé dans le document html
    todoList.appendChild(listItem);
}

// Écouteur : Ajouter un nouvel élément quand on clique sur "Add"
newItemAddButton.addEventListener('click', () => {
    const title = newItemTitleInput.value.trim();
        addTodoItem(title);
        newItemTitleInput.value = ''; // Réinitialise le champ
    }
);


// Foction pour modifier un élément
function startEditItem(listItem, span) {
    // On met à jour la variable d'édition en cours
    currentEditingItem = { listItem, span };

    // Affiche l'interface d'édition et on masque celle d'ajout
    editItemDiv.hidden = false;
    editItemTitleInput.value = span.textContent;
    document.querySelector('#new-item').hidden = true;
}

// Écouteurs pour détecter quand les boutons de confirmation ou d'annulation de mofification ont été appuyés
editItemConfirmButton.addEventListener('click' , confirmEditItem);
editItemCancelButton.addEventListener('click', cancelEditItem);

// Fonction pour confirmer la modification d'un élément
function confirmEditItem() {
    if (currentEditingItem) {
        // Met à jour le texte de l'élément
        currentEditingItem.span.textContent = editItemTitleInput.value;

        // Réinitialise et masque l'interface d'édition
        cancelEditItem();
    }
}

// Fonction qui permet d'annuler l'édiyion
function cancelEditItem() {
    currentEditingItem = null;

    // Réinitialise les champs et affiche l'interface d'ajout
    editItemDiv.hidden = true;
    document.querySelector('#new-item').hidden = false;
}