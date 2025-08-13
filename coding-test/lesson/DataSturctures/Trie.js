class HashTableNode {
     constructor(value = '') {
        this.value = value;
        this.children = new Map();
     }    
}

class HashTableTrie {
    constructor () {
        this.root = new HashTableNode();
    }

    //string 입력
    insert(string) {
        var currentNode = this.root;

        for(const char of string) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new HashTableNode(currentNode.value + char));
            }

            currentNode = currentNode.children.get(char);
        }
    }

    //존재여부 확임
    has(string) {
        var currentNode = this.root;

        for(const char of string) {
            if (!currentNode.children.has(char)) {
                return false;
            }

            currentNode = currentNode.children.get(char);            
        }

        return true;
    }
}


const trie = new HashTableTrie();
trie.insert("cat");
trie.insert("can");

console.log(trie.has("cat"));
console.log(trie.has("can"));
console.log(trie.has("cap"));