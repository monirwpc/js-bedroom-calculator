jQuery(document).ready(function(){
	jQuery('#result').click(function(){
		//declare variable
		var twin   = 0;
		var double = 0;
		var queen  = 0;
		var king   = 0;

		//get questions answer and store
		var sleep_person =  jQuery("#sleep_person option:selected").val();
		var person_age   =  jQuery("#person_age option:selected").val();
		var extra_room   =  jQuery("#extra_room option:selected").val();
		var room_size    =  jQuery("#room_size option:selected").val();
		var toss_turn    =  jQuery("#toss_turn option:selected").val();

		//count tatal score and store it variable( var should be 0 when at first, but when change select option score add to variable with its oldest value )
		// sleep person
		if( sleep_person == '1' ) {
			var twin   = twin+1;
			var double = double+1;
			var queen  = queen+1;
		} else if ( sleep_person == '2+' ) {
			var double = double+1;
			var queen  = queen+1;
			var king   = king+1;
		}

		//person age
		if( person_age == 'child' ) {
			var twin   = twin+1;			
		} else if ( person_age == 'youth' ) {
			var twin   = twin+1;
			var double = double+1;
		} else if ( person_age == 'adult' ) {
			var double = double+1;
			var queen  = queen+1;
			var king   = king+1;
		} else if ( person_age == 'senior' ) {
			var double = double+1;
			var queen  = queen+1;
			var king   = king+1;
		}

		//extra room
		if( extra_room == 'yes' ) {
			var queen  = queen+1;
			var king   = king+1;
		} else if ( extra_room == 'no' ) {
			var double = double+1;
			var queen  = queen+1;
			var king   = king+1;
		}

		// room_size
		if( room_size == 'under_70' ) {
			var twin   = twin+1;
		} else if ( room_size == '70_100' ) {
			var twin   = twin+1;
			var double = double+1;
		} else if ( room_size == '101_120' ) {
			var twin   = twin+1;
			var double = double+1;
			var queen  = queen+1;
		} else if ( room_size == '121+' ) {
			var double = double+1;
			var queen  = queen+1;
			var king   = king+1;
		}
		
		//declare array and sort
		var arr =  { 'king':king, 'queen':queen, 'double':double, 'twin': twin };
		//key sort == ks
		var ks = Object.keys(arr).sort(function( keya, keyb ) {
           return arr[keyb] - arr[keya];
        });
        var first_key  = ks[0];
		var second_key = ks[1];
		var third_key  = ks[2];
		var forth_key  = ks[3];
		
		//checking condition and print result
		//checking condition toss_turn = yes || no
		//also for twin & double & king & queen
		if( toss_turn == 'yes' || toss_turn == 'no' ) {
			if( ( ( person_age == 'child' ) && ( sleep_person == '1' ) ) || ( ( room_size == 'under_70' ) && ( sleep_person == '1' ) ) ) {
				document.getElementById('output').innerHTML = 'twin';
			} else if( ( person_age == 'child' ) && ( sleep_person == '2+' ) && ( extra_room == 'yes' ) ) {
				if( toss_turn == 'yes' ) {
					document.getElementById('output').innerHTML = 'double';
				} else {
					document.getElementById('output').innerHTML = 'twin';
				}
			} else if( ( ( person_age == 'youth' ) && ( sleep_person == '2+' ) && ( ( extra_room == 'yes' ) || ( extra_room == 'no' ) ) ) && ( ( room_size == '101_120' ) || ( room_size == '121+' ) ) ) {
				if( toss_turn == 'yes' ) {
					if( extra_room == 'no' ) {
						document.getElementById('output').innerHTML = second_key;
					} else {
						document.getElementById('output').innerHTML = first_key;
					}
				} else {
					if( extra_room == 'no' ) {
						if( room_size == '121+' ) {
							document.getElementById('output').innerHTML = third_key;
						} else {
							document.getElementById('output').innerHTML = first_key;
						}			
					} else {
						document.getElementById('output').innerHTML = second_key;
					}
				}
			} else if( ( room_size == '121+' && sleep_person == '1' ) && ( person_age == 'adult' || person_age == 'senior' ) ) {
				document.getElementById('output').innerHTML = 'king';
			} else if( room_size == '121+' && sleep_person == '1' && person_age == 'youth' && extra_room == 'no' ) {
				document.getElementById('output').innerHTML = 'queen';
			} else if( ( room_size == 'under_70' && sleep_person == '2+' ) || ( room_size == '70_100' && extra_room == 'yes' && ( person_age == 'adult' || person_age == 'senior' ) ) || ( room_size == '101_120' && ( person_age == 'child' || person_age == 'youth' ) ) || ( room_size == '121+' && person_age == 'child' && sleep_person == '2+' && extra_room == 'no' ) ) {
				document.getElementById('output').innerHTML = 'double';
			} else {
				document.getElementById('output').innerHTML = first_key;
			} 
		}

		//print total score
		document.getElementById('score').innerHTML = ('twin= '+twin+', double= '+double+', queen= '+queen+', king= '+king );
	});
});