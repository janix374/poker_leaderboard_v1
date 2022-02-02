import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Logo from '../../components/Logo/Logo';
import { pokerRule, textHowToPlay, pageContainerStyle } from './styles';

const PokerTutorial = () => {
	return (
		<Box sx={pageContainerStyle}>
			<Grid container spacing={2} pt={5}>
				<Grid item xs={12} sm={4}>
					<Typography variant='h4' component='h4' mb={1}>
						Poker Tutorial
					</Typography>
					<Box sx={pokerRule}>
						<img
							alt='poker rule'
							src={window.location.origin + `/assets/images/pokerrule.jpg`}
						/>
					</Box>
					<Typography variant='body1' component='p' mb={1}>
						This is going to be a rough guide on how to play a hand using poker
						rules, with an example listed below. A hand of No-Limit Texas
						Hold’em begins with each player receiving two cards facedown, called
						“hole cards.”
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography variant='h4' component='h4' mb={1}>
						Poker Hands Rankings
					</Typography>
					<Typography variant='body1' component='p' mb={2}>
						Here’s a look at the best possible hands that can be used in
						standard poker rules, in descending order:
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						1. Royal Flush: This hand is the rarest in poker. It’s when you make
						a ten-to-ace straight all in the same suit such as A♦K♦Q♦J♦T♦
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						2. Straight Flush: Five consecutive cards of differing suits, like
						8♠7♠6♠5♠4♠, then you have a straight flush.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						3. 4-of-a-Kind: The name says it all! If you have all four of the
						same card, like A♠4♠4♣4♥4♦ then you have quads!
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						4. Full House: Also known as a “boat,” it’s when you have three of a
						kind along with a pair - for example: A♦A♣A♥J♥J♠ (three of one, two
						of the other)
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						5, Flush: There are four suits in poker (diamonds, hearts, spades,
						and clubs). When you have five cards all in the same suit, you have
						a flush. An example might be A♥J♥8♥4♥2♥
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						6, Straight: Five consecutive cards of differing suits, like
						8♥7♣6♦5♦4♠ is a straight. An A-2-3-4-5 straight is known as a
						“wheel,” while 10-J-Q-K-A is called “Broadway.”
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						7. 3-of-a-Kind: Whenever you have three of the same cards (i.e.
						A♠K♥5♠5♦5♣) you have three-of-a-kind. If you make three-of-a-kind
						with a pair in the hole and one on the board, it’s “a set.” If you
						make it with two on the board and one card in the hole, then it’s
						called “trips.”
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						8. Two Pair: Is when you have not one, but two pairs. The fifth card
						is your kicker. For instance, if you have A♣K♥5♥K♠5♦ you have kings
						and fives with an ace kicker.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						9. One Pair: There are thirteen different cards of each suit.
						Whenever you match two, it’s called a pair. For example,A♦A♣7♠4♠2♣2
						is a pair of aces.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						10. High Card: If no one can make a ranked hand (different suits,
						non-connected, unpaired) it comes down to your high card(s). If you
						have A♣Q♦9♥6♣3♦ then you have ace-queen high.
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<Logo />
				</Grid>

				<Grid item xs={12} sx={textHowToPlay}>
					<Typography variant='h4' component='h4' mb={1} textAlign='center'>
						How to Play the Game
					</Typography>
					<Typography variant='body1' component='p' mb={2}>
						Players can win a hand by using any combination of their two-hole
						cards and five community cards on the board to form the best five
						card hand.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						Remember, after players receive their cards, a round of “preflop”
						betting occurs. Each “street,” or round after that, has a different
						name.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						<span>Flop</span> – The first three community cards dealt are
						referred to as “the flop”. All remaining players can use these
						community cards to try and make the best poker hand. Play continues
						with a round of betting. The action starts with the first player
						still in the hand who is to the left of the dealer button.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						<span>Turn</span> – After completing the round of betting on the
						flop, another community card is dealt, called the turn (AKA Fourth
						Street). A total of two hole cards and four community cards are
						available for active players to try and make the best five-card
						hand.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						Another round of betting takes place. Again, the action starts with
						the first remaining player seated to the left of the button. Play
						always continues in a clockwise direction. When all remaining
						players have acted, the betting round ends.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						<span>River</span> – The river (AKA Fifth Street) is the fifth and
						last community card. A final round of betting takes place. If
						there’s a showdown – the point where all action is complete –
						players turn up their hands. The last player to bet, known as the
						last aggressor, must show first. Whoever holds the best five-card
						hand wins the pot, This action completes the hand, moving on to a
						new one.
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<Logo />
				</Grid>

				<Grid item xs={12} sx={textHowToPlay}>
					<Typography variant='h4' component='h4' mb={1} textAlign='center'>
						Dealer Button and Blinds
					</Typography>
					<Typography variant='body1' component='p' mb={2}>
						In most games, a dedicated dealer facilitates the dealing. In home
						poker games, it’s not uncommon for players to rotate the deal among
						themselves.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						If there is a dedicated dealer, a button indicates who has the deal.
						That button then moves one spot clockwise after each hand. The
						purpose of the button is to identify where the action should begin
						each time.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						<span>
							The action always starts with the first person left of the button.
						</span>
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						Before any cards are dealt, the player to the direct left of the
						button must post (pay) the small blind. The player to the left of
						him must post the big blind.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						These “blinds” are forced bets that help give players something
						chase. Think about it: If there were no blinds in poker, players
						would never “blind off”. They would never lose chips from always
						folding preflop.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						Players would wait until they had Aces dealt to them, and then go
						all-in.
					</Typography>

					<Typography variant='body1' component='p' mb={2}>
						For example, if the game was $1-$2 No-Limit Hold’em, the player to
						the direct left of the button must post a $1 small blind. The player
						after that has to pay the $2 big blind. These are mandatory “blind
						bets” and must be posted. If a player refuses according to poker
						rules, they must sit out of the game.
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default PokerTutorial;
