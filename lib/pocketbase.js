import Pocketbase from 'pocketbase'

const pb = new Pocketbase('http://127.0.0.1:8090');


// fetch a paginated records list
async function homeProjectList() {
    const data = await pb.collection('projects').getList(1, 5, {
        filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
    });
    return data
}


export default pb
// export { homeProjectList }
// module.experiments.topLevelAwait = true
// module.exports = { homeProjectList }