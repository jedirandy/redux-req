export const request = (url, method, {
    payload,
    onSuccess,
    onError
}) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send(payload);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4)
            if (xhr.status < 400)
                onSuccess(xhr.response, xhr);
            else
                onError(xhr.response, xhr);
    }
};

export default request;
