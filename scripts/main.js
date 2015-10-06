document.addEventListener("DOMContentLoaded", function(event) { 
	var todoList = new Array();
	var pos = 0;
	document.getElementById("todo-item").disabled = true;
	document.getElementById("add-more-btn").disabled = true;
	document.getElementById("add-more-list-btn").disabled = true;

	document.getElementById("create-list").addEventListener("click", function() {
		var length = todoList.length;
		var filled = false;
		var list_name = document.getElementById("todo-name").value;
		document.getElementById("add-more-btn").disabled = false;
		document.getElementById("add-more-list-btn").disabled = false;
		document.getElementById("todo-item").disabled = false;
		if (list_name.length > 0) filled = true;
		if (filled) {
			todoList[pos] = new ToDo(list_name, pos);
			document.getElementById("todo-name").disabled = true;
			document.getElementById("create-list").disabled = true;
		}
		else alert ("Please fill ToDo list name");
	});

	function ToDo(name, id) {
		this.name = name;
		this.list_items = new Array();
		this.item_counter = 0;
		this.panelID = id;
		this.createListPanel(this.panelID);
	}
  
	ToDo.prototype.setItem = function(value) {
		var value = value;
		var list_items,
			list_itemChild,
			list_itemParent,
			content,
			removeItem;
		this.list_items[this.item_counter] = value;
		
		list_itemParent = document.getElementById("panel" + this.panelID);
		list_itemChild = list_itemParent.getElementsByClassName("panel-body");
		listItemDiv = document.createElement("div");
		listItemDiv.className = "row";
		content = document.createTextNode(value);
		removeItem = document.createElement("button");
		removeItem.className = "pull-right btn btn-default";
		removeItem.innerHTML = "x";
		removeItem.onclick = function() {
			var parent = this.parentNode;
			parent.parentNode.removeChild(parent);
			this.removeItem(this.item_counter);
		};
		listItemDiv.appendChild(content);
		listItemDiv.appendChild(removeItem);
		list_itemChild[0].appendChild(listItemDiv);

		this.item_counter++;
		return false;
	}
  
	ToDo.prototype.removeList = function(id) {

		return false;
	}

	ToDo.prototype.removeItemFunc = function(id) {

		return false;
	}
  
	ToDo.prototype.createListPanel = function(id) {
		var id = id;
		var listItemDiv,
			listItemBodyDiv,
			listItemHeaderDiv,
			header,
			removePanel,
			currentDiv;
		listItemDiv = document.createElement("div");
		listItemHeaderDiv = document.createElement("div");
		listItemBodyDiv = document.createElement("div");
		listItemDiv.className = "panel panel-default";
		listItemDiv.id = "panel" + id;

		listItemHeaderDiv.className = "panel-heading";
		header = document.createTextNode(this.name);
		listItemHeaderDiv.appendChild(header);
		removePanel = document.createElement("button");
		removePanel.className = "btn btn-info pull-right";
		removePanel.innerHTML = "x";
		removePanel.onclick = function() {
			var parent = this.parentNode.parentNode;
			parent.parentNode.removeChild(parent);
			//this.removeList(id);
		};
		listItemHeaderDiv.appendChild(removePanel);
		listItemBodyDiv.className = "panel-body";
		listItemDiv.appendChild(listItemHeaderDiv);
		listItemDiv.appendChild(listItemBodyDiv);
		
		currentDiv = document.getElementById("added-todo-lists"); 
		currentDiv.appendChild(listItemDiv);
	}
 
    document.getElementById("add-more-btn").addEventListener("click", function() {
		var length = todoList.length;
		var list_item = document.getElementById("todo-item").value;
		todoList[pos].setItem(list_item);
		document.getElementById("todo-item").value = "";
	}); 
	
	document.getElementById("add-more-list-btn").addEventListener("click", function() {
		pos++;
		document.getElementById("todo-name").disabled = false;
		document.getElementById("todo-name").value = "";
		document.getElementById("create-list").disabled = false;
		document.getElementById("todo-item").value = "";
		document.getElementById("todo-item").disabled = true;
	    document.getElementById("add-more-btn").disabled = true;
		document.getElementById("add-more-list-btn").disabled = true;
	});

});