export const getCompanyTitle = (name) => {
    if (name.includes('-')) {
        return name.split('-')[0]
    } else if (name.includes('|')) {
        return name.split('|')[0]
    } else if (name.includes(':')) {
        return name.split(':')[0]
    } else {
        return name
    }
}

export const getDescription = (desc) => {
    if (desc.length > 50) {
        return `${desc.slice(0, 50)}...`;
    }
    return desc;
}