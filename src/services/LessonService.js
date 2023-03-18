
const url = 'http://express-env.eba-bitp3hp2.ap-northeast-1.elasticbeanstalk.com/lessons/';

class LessonService {

  // Get Lessons
  static getLessons() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(url);
        const data = res.json();
        resolve(
          data
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  // Update Lesson
  static updateLesson(id, value) {
    return fetch(`${url}${id}`,{
      method:  'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        space: value
      })
    })
  }
}

export default LessonService;
