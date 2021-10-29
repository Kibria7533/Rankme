import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass, serialize } from "class-transformer";
import * as moment from 'moment';
import { CollegeDto } from "../college/college.dto";
import { College } from "../college/college.entity";
import { CollegeService } from "../college/v1/college.service";
import { getManager, Repository } from "typeorm";
import { Voting } from "./voting.entity";
import util from "util";

@Injectable()
export class VotingService {
  constructor(
    @InjectRepository(Voting) private votingRepo: Repository<Voting>,
    private collegeService: CollegeService
  ) { }
  async getCollegesForVoting(): Promise<CollegeDto[]> {
    var date = new Date();
    date.setDate(date.getDate() - 5);
    var fromDate = date.toLocaleDateString('en-GB');
    var fromDate = (moment(fromDate, 'DD/MM/YYYY')).format('YYYY-MM-DD');
    //get colleges that has minimum games , colleges having voting count null or minimum
    const collegesChoices = await getManager().query('SELECT * FROM college t1 LEFT JOIN (SELECT collegeId, COUNT(*) as voting_count FROM voting WHERE created_at >= "' + fromDate + '" GROUP BY collegeId ) t2 ON t1.id = t2.collegeId WHERE voting_count is null or voting_count = (SELECT MIN(voting_count)  FROM college t3 LEFT JOIN (SELECT collegeId, COUNT(*) as voting_count FROM voting WHERE created_at >= "' + fromDate + '" GROUP BY collegeId  ) t4 ON t3.id = t4.collegeId )');

    //if there exist null voting count consider it as minimum game played
    var firstChoices = collegesChoices.filter(function (e) {
      return e.voting_count == null;
    });

    //if there doesnot exist any null voting count the choice list will be minimum voting count colleges
    if (firstChoices.length === 0) {
      var firstChoices = collegesChoices;
    }





    var i = 0;
    start: while (true) {
      //get random college that from minimum game played choice list
      var firstChoice = firstChoices.sort(() => 0.5 - Math.random()).slice(0, 1)[0];


      //get another college that has rating nearest to first choice
      var secondChoices = await getManager().query('SELECT * FROM college ORDER BY ABS( rating - ' + firstChoice.rating + ' ) ASC LIMIT 1');
      i++;
      if (firstChoice.id == secondChoices[0].id) continue start;
      break;
    }
    // console.log(firstChoice.id, secondChoices[0].id)
    return [plainToClass(CollegeDto, firstChoice), plainToClass(CollegeDto, secondChoices[0])];
  }

  async postVote(votingPostDto) {

    const contenders = votingPostDto.contenders;
    const winner = votingPostDto.winner;

    // console.log(contenders, 'contenders')
    const first_contender = await this.collegeService.getById(contenders[0], {});
    const second_contender = await this.collegeService.getById(contenders[1], {});
    console.log(first_contender, 'voting service a ja pelam')



    if (first_contender.total_game < 30) {
      var first_contender_factor = 40;
    } else if (first_contender.max_rating <= 2400 && first_contender.max_rating >= 1800) {
      var first_contender_factor = 30;
    }
    else if (first_contender.max_rating < 1800 && first_contender.max_rating >= 1200) {
      var first_contender_factor = 20;
    }
    else if (first_contender.max_rating < 1200 && first_contender.max_rating >= 1000) {
      var first_contender_factor = 15;
    }
    else {
      var first_contender_factor = 10;
    }

    if (second_contender.total_game < 30) {
      var second_contender_factor = 40;
    } else if (second_contender.max_rating <= 2400) {
      var second_contender_factor = 20;
    } else {
      var second_contender_factor = 10;
    }

    const rating_of_first_contender = Number(first_contender.rating);
    const rating_of_second_contender = Number(second_contender.rating);

    const prob_of_first_contender: number =
      Number(1.0 /
        (1.0 +
          Math.pow(
            10,
            (rating_of_first_contender - rating_of_second_contender) / 400,
          )));

    const prob_of_second_contender =
      Number(1.0 /
        (1.0 +
          Math.pow(
            10,
            (rating_of_second_contender - rating_of_first_contender) / 400,
          )));



    const actual_score_of_first_contender: number =
      winner == first_contender.id ? 1 : 0;
    const actual_score_of_second_contender: number =
      winner == second_contender.id ? 1 : 0;




    const final_rating_of_first_contender =
      Number(rating_of_first_contender +
        (first_contender_factor * (actual_score_of_first_contender - prob_of_first_contender)));

    const final_rating_of_second_contender =
      Number(rating_of_second_contender +
        (second_contender_factor * (actual_score_of_second_contender - prob_of_second_contender)));

    const first_contender_total_game = first_contender.total_game + 1;
    // console.log(first_contender, 'lool')
    const second_contender_total_game = second_contender.total_game + 1;

    if (first_contender.max_rating < final_rating_of_first_contender) {
      var first_contender_max_rating = final_rating_of_first_contender;
    } else {
      var first_contender_max_rating = first_contender.max_rating;
    }

    if (second_contender.max_rating < final_rating_of_second_contender) {
      var second_contender_max_rating = final_rating_of_second_contender;
    } else {
      var second_contender_max_rating = second_contender.max_rating;
    }

    // console.log('voting here', first_contender.id, final_rating_of_first_contender, first_contender_max_rating, first_contender_total_game)
    try {

      await this.collegeService.updateCollege(first_contender.id, {
        rating: final_rating_of_first_contender,
        max_rating: first_contender_max_rating,
        total_game: first_contender_total_game
      });

      await this.collegeService.updateCollege(second_contender.id, {
        rating: final_rating_of_second_contender,
        max_rating: second_contender_max_rating,
        total_game: second_contender_total_game
      });



      await this.votingRepo.save({
        college: first_contender,
      });

      await this.votingRepo.save({
        college: second_contender
      })
      // console.log(first_contender,'first contender')
      // console.log(second_contender,'second contender')
      return true;
    } catch (err) {
      // console.log(err.message, 'meesege');
      return false;
    }



  }

}