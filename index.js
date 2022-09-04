class Node {
    constructor(value = "") {
        this.value = value;
        this.children = new Map();
        this.wordCount = 0;
    }
}

class Trie {
    constructor(){
        this.root = new Node();
    }
    insert(word) {
        var currentNode = this.root;

        for (const c of word) {
            if (!currentNode.children.has(c)) {
                currentNode.children.set(c, new Node(currentNode.value + c));
            }
            
            currentNode.wordCount += 1;
            currentNode = currentNode.children.get(c);
        }
        currentNode.wordCount += 1;
    }

    autoSearch(word) {
        console.log(word);
        var currentNode = this.root;
        var count = 0;

        for (const c of word) {
            console.log(currentNode);
            count += 1;
            if (currentNode.value == word) {
                return count;
            }

            currentNode = currentNode.children.get(c);
            if(currentNode.wordCount == 1){
                return count;
            }
        }
        return count;
    }
}

function solution(words) {
    var myTrie = new Trie();
    words.forEach((word) => {
        myTrie.insert(word);
    });

    var count = 0;
    words.forEach((word) => {
        count += myTrie.autoSearch(word);
        console.log(count);
    });

    return count;
}

console.log(solution(["go","gone","guild"]));