<?php
use Illuminate\Database\Seeder;
use Winwins\Model\ActivityType;

class ActivityTypesTableSeeder extends Seeder {

    public function run() {
        DB::table('activity_types')->delete();

        $activityType = new ActivityType();
        $activityType->name = 'wwjoin';
        $activityType->description = 'WW Join';
        $activityType->save();

        $activityType = new ActivityType();
        $activityType->name = 'wwleft';
        $activityType->description = 'WW Left';
        $activityType->save();

        $activityType = new ActivityType();
        $activityType->name = 'groupjoin';
        $activityType->description = 'Gropup Join';
        $activityType->save();

        $activityType = new ActivityType();
        $activityType->name = 'groupleft';
        $activityType->description = 'Group Left';
        $activityType->save();

        $activityType = new ActivityType();
        $activityType->name = 'groupnew';
        $activityType->description = 'Group New';
        $activityType->save();

        $activityType = new ActivityType();
        $activityType->name = 'wwnew';
        $activityType->description = 'WW New';
        $activityType->save();

    }

}
