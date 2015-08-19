var evolve = function(target) {
	var target = target;

//Creates one chromosome(random instance) of the same length as target.
  var chromosome = function(length) {
  	var result = [];

  	for (var i = 0; i < length; i++) {
  		result.push(String.fromCharCode(Math.floor(Math.random() * (123-64)) + 64));
  	}
  	return result.join("");
  };

//Creates an array(population) of random chromosomes.
  var populate = function(popSize, stringSize) {
  	var pop = [];

  	for (var i = 0; i < popSize; i++) {
  		pop.push(chromosome(stringSize));
  	}
  	return pop;
  };

//Returns an integer fitLevel containing the diff. in characters between chromosome and target.
  var fitness = function(chromosome) {
    var fitLevel = 0;

    for (var i = 0; i < chromosome.length; i++) {
    	fitLevel += Math.abs(target.charCodeAt(i) - chromosome.charCodeAt(i));
    }
    return fitLevel;
  };

//(Somewhat) random selection - out of 8 potential parents, the two with lowest
// fitLevel create a child containing the best (closest to target) traits of each 
  var mate = function(populationArray) {
  	var pool = [];
  	var parents = [];
  	var child = [];

  	for (var i = 0; i < 8; i++) {
  		pool.push(populationArray[Math.floor(Math.random() * populationArray.length)]);
  	}

  	pool.sort(function(a,b) {return fitness(a) < fitness(b)});
  	parents.push(pool[0], pool[1]);
	  	for (var i = 0; i <parents[0].length; i++) {
	  		if (fitness(parents[0][i]) < 6) {
	  			child.push(parents[0][i]);
	  		} else {
	  			child.push(String.fromCharCode(Math.floor(Math.random() * (123-64)) + 64));
	  		}
	  	}
	  populationArray.push(child.join(""));
	};
  //Gives one random individual a 1 in 50 chance to evolve a character from target.
	// var mutate = function(populationArray) {
	// 	var selection = populationArray[Math.floor(Math.random() * populationArray.length)].split("");
 //    var closest = target.split("");

 //    for (var i = 0; i < selection.length; i++) {
 //    	if (Math.floor(Math.random() * 50) === 2) {
 //    		selection[i] = closest[i];
 //    	}
 //    }
 //    console.log(selection.join(""));
 //  };
  //Removes the member of populationArray with the highest(worst) fitness
  var remove = function(populationArray) {
  	populationArray.sort(function(a,b){return fitness(a) < fitness(b)});
  	populationArray.pop();
  };


  var population = populate(400, target.length);
  var best = population.sort(function(a,b) {return fitness(a) < fitness(b)})[0];
  var count = 0;

  while (best !== target) {
  	mate(population);
  	remove(population);
  	mutate(population);
  	best = population.sort(function(a,b) {return fitness(a) < fitness(b)})[0];
  	console.log(best + " " + count + " cycle.");
  	count++ 
  }
};
