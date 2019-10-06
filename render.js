let object_keys = Object.keys(data);

function render(id, format="") {
	document.getElementById(id).innerHTML = data[id];
}

function addNode(id, item, element) {
	let node = document.createElement(element);
	let textnode = document.createTextNode(item);
	node.appendChild(textnode);                              
	document.getElementById(id).appendChild(node); 
}

function addAnchor(id, key, value, element) {
	let node = document.createElement(element);
	let textnode = document.createTextNode(key);
	node.appendChild(textnode);
	node.setAttribute("href", value);                        
	document.getElementById(id).appendChild(node); 
}

function addImage(id, key, value, element) {
	let node = document.createElement(element);
	let textnode = document.createTextNode(key);
	node.appendChild(textnode);
	node.setAttribute("src", value);
	node.setAttribute("alt", key);                        
	document.getElementById(id).appendChild(node); 
}

function renderMany(id, key_element="h2", value_element="p") {
	for(let [key, value] of Object.entries(data[id])) {
		addNode(id, key, key_element);
		addNode(id, value, value_element);
	}
}

function renderServices(id, outer_class="about", inner_class="column") {
	let result = "<div class='" +  outer_class + "'>";
	for(let [key, value] of Object.entries(data[id])) {
		result += "<div class='" + inner_class + "'>" + key + "<p>" + value + "</p></div>";
	}
	result += "</div>";
	document.getElementById(id).innerHTML = result;
}

function renderImages(id, key_element="img") {
	for(let [key, value] of Object.entries(data[id])) {
		addImage(id, key, value, key_element)
	}
}

function renderAnchors(id, key_element="a") {
	for(let [key, value] of Object.entries(data[id])) {
		addAnchor(id, key, value, key_element);
	}
}

function renderSocial(id, key_element="a") {
	for(let [key, value] of Object.entries(data[id])) {
		if (value != "") {
			addAnchor(id, key, value, key_element);
		}
	}
}

function renderAddress(id, outer_class="about", inner_class="") {
	let result = "<div class='" +  outer_class + "'>";
	for(let [key, value] of Object.entries(data[id])) {
		if(value != "") {
			result += "<div class='" + inner_class + "'><p>" + value + "</p></div>";
		}
	}
	result += "</div>";
	document.getElementById(id).innerHTML = result;
}

function renderTelephone(id, format="") {
	document.getElementById(id).innerHTML = "<a href='tel:" + data[id] + "'>" + data[id] + "</a>"
}

function renderEmail(id, format="") {
	document.getElementById(id).innerHTML = "<a href='mailto:" + data[id] + "'>" + data[id] + "</a>"
}

for(let j = 0; j < object_keys.length; j++) {
	if(document.getElementById(object_keys[j])) {
		if(data[object_keys[j]] != "") {
			if(typeof data[object_keys[j]] == typeof {}) {
				if(object_keys[j] == "images" || object_keys[j] == "logo") {
					renderImages(object_keys[j]);							
				} else if(object_keys[j] == "docs") {
					renderAnchors(object_keys[j]);
				} else if(object_keys[j] == "social") {
					renderSocial(object_keys[j]);
				} else if(object_keys[j] == "services") {
					renderServices(object_keys[j]);
				} else if(object_keys[j] == "address") {
					renderAddress(object_keys[j]);
				} else {
					renderMany(object_keys[j]);
				}
			} else if(object_keys[j] == "email") {
				renderEmail(object_keys[j]);
			} else if(object_keys[j] == "telephone") {
				renderTelephone(object_keys[j]);
			} else {
				render(object_keys[j]);	
			}
		}
	}
}