/**
 * Hàm xác định loại gói bảo hiểm xe ô tô.
 * @param {number} carAge - Tuổi xe (năm)
 * @param {number} carValue - Giá trị xe (triệu đồng)
 * @param {number} driveExperience - Số năm kinh nghiệm lái xe (năm)
 * @returns {number} Mã loại gói bảo hiểm (0–7)
 */

function getInsuranceType(carAge, carValue, driveExperience) {
    if (
        typeof carAge !== "number" ||
        typeof carValue !== "number" ||
        typeof driveExperience !== "number" ||
        carAge <= 0 ||
        carValue <= 0 ||
        driveExperience < 0 ||
        driveExperience > 50
    ) {
        return 7;
    }

    if (carValue < 500) {
        if (driveExperience < 1) return 1;
        else return 0;
    }

    if (carValue >= 500 && carValue <= 2000) {
        if (carAge >= 1 && carAge <= 5) {
            return 3;
        } else {
            return 2;
        }
    }

    if (carValue > 2000) {
        if (carAge < 1) {
            if (driveExperience > 10) return 6;
            else return 5;
        } else {
            return 4;
        }
    }

    return 7;
}
