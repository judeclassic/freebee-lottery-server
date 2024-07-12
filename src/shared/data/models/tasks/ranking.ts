import { Schema, model, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from '../user';

export type IRanking = {
    _id: Schema.Types.ObjectId,
    user: IUser;
    ratings: number;
    created_at: Date;
    updated_at: Date;
};

const RankingSchema = new Schema<IRanking>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    ratings: {
        type: Number,
        default: 0,
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

mongoosePaginate(RankingSchema);

export const RankingModel = model<IRanking, PaginateModel<IRanking>>("ranking", RankingSchema);

export type IPaginatedRanking = {
    total_rankings: number;
    rankings: IRanking[];
    has_next: boolean;
}