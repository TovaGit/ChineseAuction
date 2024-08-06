export const NodeService = {
    getTreeNodesData() {
        return [
            {
                key: '0',
                label: 'Price: from high to low',              
            },
            {
                key: '0',
                label: 'Price: from low to high',              
            },
        ];
    },

    getTreeTableNodes() {
        return Promise.resolve(this.getTreeTableNodesData());
    },

    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }
};
