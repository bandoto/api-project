const postData = async (url, data, token) => {
    const res = await fetch(url, {
        method: 'POST', 
        headers: {
            'Token': token
        },
        body: data
    });

    return await res.json();
};

const getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getResources};