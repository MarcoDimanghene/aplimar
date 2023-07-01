const ts ="1";
const pubkickey = 'b537142c181841a05c3ffff04baf475c';
const hashval="a4023ba1a3737872df6b390786e671de";


const requestpj = async (name) => {
    const baseURL = `https://gateway.marvel.com:443/v1/public/characters`;

    const query = `?nameStartsWith=${name}&ts=${ts}&apikey=${pubkickey}&hash=${hashval}`;

    const response = await fetch(baseURL + query);
    const data = await response.json();

    const results = data.data.results;
    console.log(results);
    return results;
};
requestpj("hulk")

