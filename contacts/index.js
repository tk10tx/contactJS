var fs = require('fs');
var readlineSync = require('readline-sync');

var arr = [];

function loadData(){
	var data = fs.readFileSync('./data.json', { encoding: 'utf8'});
	arr = JSON.parse(data);
	
}

function showMenu(){
	console.log("-------------------------------------------");
	console.log("1. Show all contacts.");
	console.log("2. Create a contact.");
	console.log("3. Edit a contact.");
	console.log("4. Delete a contact.");
	console.log("5. Search a contact.");
	console.log("6. Exit");
	console.log("-------------------------------------------");

	var option = readlineSync.question('Select a option: ');
	switch(option){
		case '1':
			showContacts(arr);
			showMenu();
			break;
		case '2':
			createContact();
			showMenu();
			break;
		case '3':
			editContact();
			showMenu();
			break;
		case '4':
			deleteContact();
			showMenu();
			break;
		case '5':
			searchContact();
			showMenu();
			break;
		case '6':
			break;

		default:
			console.log("Wrong option");
			showMenu();
			break;
	}

}

function showContacts(arr){
	for(var person of arr)
	console.log("Id: ",person.id,"\t\tName: ",person.name,"\t\tPhone: ", person.phone);
}

function createContact(){
	var name = readlineSync.question('Name: ');
	var phone = readlineSync.question('Phone: ');
	var element = {
		id: arr.length+1,
		name: name,
		phone: parseInt(phone)
	}
	arr.push(element);
	save();
}

function editContact(){
	var id = readlineSync.question('Input id you want to edit name: ');
	id = parseInt(id);
	for(var person of arr){
		if(person.id == id){
			var nName = readlineSync.question('Input a new name: ');
			var nPhone = readlineSync.question('Input a new phone: ');
			person.name = nName;
			person.phone = parseInt(nPhone);
			save();
			break;
		}
	}
}

function deleteContact(){
	var id = readlineSync.question('Input id you want to delete: ');
	id = parseInt(id);
	var newArr = arr.filter(function(x){
		return x.id != id;
	});
	arr = newArr;
	save();
}

function searchContact(){
	var result = [];
	var find = readlineSync.question('Input the information you want to search: ');
	if(!isNaN(find)){
		find = Number(find);
		for(var i of arr){
			if(Number(i.phone).toString().indexOf(find.toString()) >=0){
				result.push(i);
			}
		}
		showContacts(result);	
	}
	else{
	    find = find.toString();
	    for(var x of arr){
	      if(x.name.toLowerCase().indexOf(find.toLowerCase())>=0){
	         result.push(x);
	      }
	    }
	    showContacts(result);
  }

}
function save(){
	fs.writeFileSync('./data.json', JSON.stringify(arr),{encoding: 'utf8'});
}

function main(){
	loadData();
	showMenu();
}
main();