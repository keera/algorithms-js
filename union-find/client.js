
function QuickfindUF() {
  this.sites = [];
}

QuickfindUF.prototype.find = function(a, b) {
  // TODO: Add checks
  return this.sites[a] == this.sites[b];
}

QuickfindUF.prototype.union = function(a, b) {
  // value of b
  var vA = this.sites[a];
  var vB = this.sites[b];
  for (var i = 0; i < this.sites.length; i++) {
    if (this.sites[i] == vA) {
      this.sites[i] = vB;
    }
  }
}

QuickfindUF.prototype.numComponents = function() {
  var connectors = [];
  var count = 0;

  for (var i = 0; i < this.sites.length; i++) {
    if (!connectors[this.sites[i]]) {
      connectors[this.sites[i]] = true;
      count++;
    }
  }

  return count;
}

QuickfindUF.prototype.createSites = function(n) {
  for (var i = 0; i < n; i++) {
    this.sites[i] = i;
  }
}

QuickfindUF.prototype.init = function() {
  var _this = this;

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(chunk) {
    var elements = chunk.split('\n');
    if (elements.length < 1) {
      return;
    }

    _this.createSites(elements[0]);
    for (var i = 1; i < elements.length; i++) {
      if (elements[i]) {
        var pair = elements[i].split(' ');
        if (!_this.find(pair[0], pair[1])) {
          console.log("Connecting sites: " + pair[0] + ", " + pair[1]);
          _this.union(pair[0], pair[1]);
        }
      }
    }

    console.log("Num components: " + _this.numComponents());

  });
}

var quickfind = new QuickfindUF();
quickfind.init();

