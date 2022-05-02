import axios from "axios";
import { promises } from "fs";

interface Root {
    _id: string;
    university_id: string;
    university_type: string;
    university_name: string;
    university_name_en: string;
    file_path_1?: string;
    is_accepted_round1: boolean;
    is_accepted_round2: boolean;
    is_accepted_round3: boolean;
    is_accepted_round4: boolean;
    file_path_2?: string;
    file_path_3?: string;
    file_path_4?: string;
    file_path_handicap?: string;
}

const getData = async () => {
    let { data } = await axios.get<Root[]>(
        "https://tcas65.s3.ap-southeast-1.amazonaws.com/mytcas/universities.json"
    );
    let newData = data.map((item) => ({
        university_id: item.university_id,
        university_name: item.university_name,
        university_name_en: item.university_name_en,
    }));

    newData.map((item) => {
        getImage(item.university_id);
    });

    // let resImage = await axios.get();
    // console.log(JSON.stringify(newData));
    // promises.writeFile("data.json",JSON.stringify(newData))
};

const getImage = async (id: string) => {
    let { data } = await axios.get(
        `https://www.mytcas.com/assets/img/logo/${id}.png`,
        {
            responseType: "arraybuffer",
        }
    );
    await promises.writeFile(`./image/${id}.png`, data);
};

getData()