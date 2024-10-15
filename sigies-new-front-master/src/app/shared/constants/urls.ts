const BASE_URL = 'http://localhost:5000';

export const OFFICIALS_URL = BASE_URL + '/api/official';
export const OFFICIALS_BY_SEARCH_URL = OFFICIALS_URL + '/';
export const OFFICIALS_BY_ID_URL = OFFICIALS_URL + '/officialId/';
export const OFFICIALS_INCLUDE_URL = BASE_URL + '/api/include-official';
export const OFFICIALS_MODIFY_URL = BASE_URL + '/api/modify-official';
export const OFFICIALS_REMOVE_BY_ID_URL = OFFICIALS_URL + '/remove-official/';
export const OFFICIALS_REMOVE_BY_CHECK_URL =
  OFFICIALS_URL + '/remove-officials-check';

export const STUDENTS_URL = BASE_URL + '/api/student';
export const STUDENTS_BY_SEARCH_URL = STUDENTS_URL + '/';
export const STUDENTS_BY_CI_URL = STUDENTS_URL + '/ci_passport/';
export const STUDENTS_INCLUDE_URL = BASE_URL + '/api/include-student';
export const STUDENTS_MODIFY_URL = BASE_URL + '/api/modify-student';
export const STUDENTS_REMOVE_BY_CI_URL = STUDENTS_URL + '/remove-student/';
export const STUDENTS_REMOVE_BY_CHECK_URL =
  STUDENTS_URL + '/remove-students-check';

export const DIUL_STUDENTS_URL = BASE_URL + '/api/diul-student';
export const DIUL_STUDENTS_BY_SEARCH_URL = DIUL_STUDENTS_URL + '/';
export const DIUL_STUDENTS_BY_CI_URL = DIUL_STUDENTS_URL + '/student/';
export const DIUL_STUDENTS_INCLUDE_URL = BASE_URL + '/api/include-diul-student';
export const DIUL_STUDENTS_MODIFY_URL = BASE_URL + '/api/modify-diul-student';
export const DIUL_STUDENTS_REMOVE_URL =
  DIUL_STUDENTS_URL + '/remove-diul-student/';
export const DIUL_STUDENTS_REMOVE_BY_CHECK_URL =
  DIUL_STUDENTS_URL + '/remove-diul-students-check';

export const CIP_STUDENTS_URL = BASE_URL + '/api/cip-student';
export const CIP_STUDENTS_BY_SEARCH_URL = CIP_STUDENTS_URL + '/';
export const CIP_STUDENTS_BY_CI_URL = CIP_STUDENTS_URL + '/student/';
export const CIP_STUDENTS_INCLUDE_URL = BASE_URL + '/api/include-cip-student';
export const CIP_STUDENTS_MODIFY_URL = BASE_URL + '/api/modify-cip-student';
export const CIP_STUDENTS_REMOVE_URL =
  CIP_STUDENTS_URL + '/remove-cip-student/';
export const CIP_STUDENTS_REMOVE_BY_CHECK_URL =
  CIP_STUDENTS_URL + '/remove-cip-students-check';

export const ANNOUNCEMENT_URL = BASE_URL + '/api/announcement';
export const ANNOUNCEMENT_BY_SEARCH_URL = ANNOUNCEMENT_URL + '/';
export const ANNOUNCEMENT_BY_ID_URL = ANNOUNCEMENT_URL + '/announcementId/';
export const ANNOUNCEMENT_INCLUDE_URL = BASE_URL + '/api/include-announcement';
export const ANNOUNCEMENT_MODIFY_URL = BASE_URL + '/api/modify-announcement';
export const ANNOUNCEMENT_REMOVE_BY_ID_URL =
  ANNOUNCEMENT_URL + '/remove-announcement/';
export const ANNOUNCEMENT_REMOVE_BY_CHECK_URL =
  ANNOUNCEMENT_URL + '/remove-announcement-check';
