// membuat pagination
const pagination = ({page = 1, limit = 5}) => {
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;
    return { take, skip };
};

export default pagination;