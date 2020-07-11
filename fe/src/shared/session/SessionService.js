import Loading from "../../components/Loading/Loading";

export const saveOngInLocalStorage = (id, name) => {
    localStorage.setItem('ongId', id);
    localStorage.setItem('ongName', name);
}

export const getOngByLocalStorage = () => {
    const ong = {};
    ong.id = localStorage.getItem('ongId');
    ong.name = localStorage.getItem('ongName');
    return ong;
}

export const tryLoginByLocalStorage = () => {

};

export const clearLocalStorage = () => {
    localStorage.clear();
};