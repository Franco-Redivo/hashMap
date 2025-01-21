
class Node{
    constructor(key,value){
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

export class HashMap{

    constructor(loadFactor, capacity){
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(capacity)
        this.keyCount = 0;
    }

    hash(key){
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i));
        }

        return hashCode % this.capacity;
    }

    resize() {
        let newCapacity = this.capacity * 2;
        let newBuckets = new Array(newCapacity);
        let oldBuckets = this.buckets;
    
        this.buckets = newBuckets;
        this.capacity = newCapacity;
        this.keyCount = 0;
    
        for (let i = 0; i < oldBuckets.length; i++) {
            let current = oldBuckets[i];
            while (current) {
                this.set(current.key, current.value); // Rehash each node
                current = current.next;
            }
        }
    }
    

    set(key, value){

        if (this.keyCount / this.capacity > this.loadFactor) {
            this.resize();
        }

        let index = this.hash(key);
        let newNode = new Node(key, value);
          

        if (!this.buckets[index]) {
            this.buckets[index] = newNode;
        } else {
            let current = this.buckets[index];
            while (current) {
                if (current.key === key) {
                    current.value = value; // Update value if key exists
                    return;
                }
                if(!current.next){
                    break;
                }
                current = current.next;
            }
            current.next = newNode;
        }
        this.keyCount ++;
    }

    get(key){
        let index = this.hash(key);
    
        if(!this.buckets[index]){
            return null;
        }

        let current = this.buckets[index];
        while (current){
            if(current.key === key){
                return current.value;
            }
            current = current.next;
        }

        return null;
    }

    has(key){
        let index = this.hash(key);

        
        if(!this.buckets[index]){
            return false;
        }

        let current = this.buckets[index];
        while (current){
            if(current.key === key){
                return true;
            }
            current = current.next;
        }

        return false;
    }

    remove(key){
        let index = this.hash(key);
        let current = this.buckets[index];

        if(current.key === key){
            this.buckets[index] = current.next;
            this.keyCount --;
            return true;
        }

        let prev = null;

        while(current && current.key !== key){
            prev = current;
            current = current.next
        }

        if(current){
            prev.next = current.next;
            this.keyCount --;
            return true;
        }

        return false;
    }

    length(){
        return this.keyCount;
    }

    clear(){
        this.buckets = new Array(this.buckets.length);
        this.keyCount = 0;
    }

    keys(){
        let keys = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while (current) {
                keys.push(current.key);
                current = current.next;
            }
        }
        return keys;
    }

    values(){
        let values = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while (current) {
                values.push(current.value);
                current = current.next;
            }
        }
        return values;
    }

    entries(){
        let pairs = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while (current) {
                pairs.push([current.key, current.value]);
                current = current.next;
            }
        }
        return pairs;
    }
}