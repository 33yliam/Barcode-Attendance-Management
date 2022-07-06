import AsyncStorage from '@react-native-async-storage/async-storage';

async function storeData(key, value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log(e)
    }
}

async function getData(key) {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}

async function clearData() {
    await AsyncStorage.clear()
}

const tempCred = {
    Liam: {
        password: 'liam123',
        id: 'fid1'
    },
    user2: {
        password: 'secured',
        id: 'fid2'
    }
}

const tempFaculty = {
    fid1: {
        name: 'Prof. Liam',
        courses: {
            PM: {
                name: 'Project Management',
                departments: [{
                    name: 'CSE',
                    year: 4,
                },
                {
                    name: 'CIVIL',
                    year: 3
                }]
            },
            DBMS: {
                name: 'Database Management Systems',
                departments: [{
                    name: 'CSE',
                    year: 2,
                },
                {
                    name: 'ECE',
                    year: 3
                }]
            },
        }
    }
}

const config = {
    rollNoLength: 10,
    deptCodePosition: [8],
    yearCodePosition: [1, 2],
    yearCodes: {
        18: 4,
        19: 3,
        20: 2,
        21: 1,
    },
    deptCodes: {
        1: 'Civil',
        5: 'CSE'
    },
    rollNoPosition: [9, 10]
}

export { storeData, getData, clearData, tempCred, tempFaculty, config }