import { randomInt, randomChoice, randomId } from '../../utils/randomizers';

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'English', 'Computer Science', 'Art', 'Music'];
const teachers = ['Mr. Smith', 'Mrs. Johnson', 'Dr. Brown', 'Ms. Davis', 'Mr. Wilson', 'Mrs. Taylor'];
const rooms = ['101', '102', '201', 'Lab A', 'Lab B', 'Auditorium', 'Gym'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const generateSchedules = (count) => {
    return Array.from({ length: count }, () => {
        const startHour = randomInt(8, 15);
        return {
            id: randomId('sch'),
            subject: randomChoice(subjects),
            teacher: randomChoice(teachers),
            room: randomChoice(rooms),
            day: randomChoice(days),
            startTime: `${startHour}:00`,
            endTime: `${startHour + 1}:00`,
            studentsEnrolled: randomInt(10, 30)
        };
    });
};
