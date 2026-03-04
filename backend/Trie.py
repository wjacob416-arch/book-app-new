class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.book_id = None #used to store google BookID for lookup

class BookTrie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self,title,book_id):
        node = self.root
        for char in title.lower():
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
        node.book_id = book_id
    def search_prefix(self,prefix):
        node = self.root
        for char in prefix.lower():
            if char not in node.children:
                return []
            node = node.children[char]
        return self._collect_all(node,prefix)
    def _collect_all(self,node,prefix):
        results = []
        if node.is_end:
            results.append({"title":prefix,"id":node.book_id})
            for char,child_node in node.children.items():
                results.extend(self._collect_all(child_node,prefix + char))
        return results[:10]