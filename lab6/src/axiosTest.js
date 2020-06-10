const axios = require('axios').default;

axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(function (response) {
        console.log('Fake post arrived!');
        console.log(`Post with ID: ${response.data.id} from user with ID: ${response.data.userId}`);
        console.log(`Title: ${response.data.title}`);
        console.log(`Content: \n${response.data.body}`);
        console.log('END OF CONTENT');
    })
    .catch(function (error) {
        console.log(error);
    });
