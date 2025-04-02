import axios from 'axios';

export async function UserLogin(username, password) {
  try {
    const response = await axios.post('', {
      username: username,
      password: password,
    });
    return response.data; // 서버에서 반환한 데이터
  } catch (error) {
    console.error('Login error:', error);
    throw error; // 에러 처리
  }
}

export async function CheckDuplicateId(username) {
  try {
    // 서버로 중복 확인 요청
    const response = await axios.post('', {
      username,
    });
    return response.data; // 서버에서 반환한 데이터
  } catch (error) {
    alert('이미 사용중인 아이디입니다');
    throw error; // 에러 처리
  }
}

export async function getAllFollower() {
  return axios.get('');
}
export async function getAllFollowing() {
  return axios.get('');
}

export async function getFollowerByUsername(username) {
  return axios.get('');
}
export async function getFollowingByUsername(username) {
  return axios.get('');
}

export async function getDdayByUsername(username) {
  return axios.get('');
}

export async function ModifyUserInfo(data) {
  try {
    // 서버로 중복 확인 요청
    const response = await axios.post('', {
      data,
    });
    return response.data; // 서버에서 반환한 데이터
  } catch (error) {
    alert('정보를 불러오는 과장에서 에러가 발생하였습니다! ');
    throw error; // 에러 처리
  }
}

export async function AddAlbum(data) {
  try {
    // 서버로 중복 확인 요청
    const response = await axios.post('', {
      data,
    });
    return response.data; // 서버에서 반환한 데이터
  } catch (error) {
    alert('정보를 불러오는 과장에서 에러가 발생하였습니다! ');
    throw error; // 에러 처리
  }
}

export async function GetAllAlbum() {
  try {
    // 서버로 중복 확인 요청
    const response = await axios.get('');
    return response.data; // 서버에서 반환한 데이터
  } catch (error) {
    alert('정보를 불러오는 과장에서 에러가 발생하였습니다! ');
    throw error; // 에러 처리
  }
}
export async function GetAlbumById(id) {
  return axios.get('');
}

export function getAllUsername() {
  return axios.get(``);
}

export function searchUsernameByKeyword(keyword) {
  return axios.get(``);
}
