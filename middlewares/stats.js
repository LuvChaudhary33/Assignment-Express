const axios = require("axios")
const _ = require("lodash")
const memoize = require("lodash/memoize")

const statsResult = async () => {
    try {
        const config = {
            headers:{
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
            }
          };
          const url = "https://intent-kit-16.hasura.app/api/rest/blogs"
          
          const resp = await axios.get(url, config);
          const arr = resp.data.blogs;
          const blogsLength = arr.length;
          const title =_.map(arr, 'title');
          const longestTitle = _.maxBy(title, o => o.length);
          const priv = _.filter(title, (o) => o.toLowerCase().includes('privacy'));
          const privBlogsLength = priv.length;
          const uniqTitle = _.uniq(title);

          const result ={
            'Total number of blogs': blogsLength,
            'The title of the longest blog': longestTitle,
            'Number of blogs with "privacy" in the title': privBlogsLength,
            'An array of unique blog titles': uniqTitle,
          }
          return result
    } catch (error) {
       throw error
    }
};

  const stats = async (req, res, next) => {
    try {
        const result =  await memoizedStats()
          res.status(200).json({result})
    } catch (error) {
      next(error);
    }
  };

  
  const memoizedStats = memoize(statsResult);


    const blogSearchResult = async(query) =>{
        try{
            const config = {
                headers: {
                    'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
                }
            };
            const url = "https://intent-kit-16.hasura.app/api/rest/blogs";
    
            const resp = await axios.get(url, config);
            const arr = resp.data.blogs;
            const titles = _.map(arr, 'title');
            const result = titles.filter(title => title.toLowerCase().includes(query.toLowerCase()));
            return result
        }catch(err){
            throw err
        }
    }

const blogSearch = async(req, res, next) =>{
        try{
            const {query} = req.query;
            const result = await memoizedBlogSearch(query)
            res.status(200).json({result});
        }catch(err){
            next(err)
        }
}

const memoizedBlogSearch = memoize(blogSearchResult, (query) => query, { maxAge: 60000 });
    
module.exports = {stats, blogSearch};