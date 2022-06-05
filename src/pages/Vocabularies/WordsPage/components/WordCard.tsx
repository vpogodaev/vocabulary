import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import {
  IWord,
  PartsOfSpeech,
  TWordValue,
} from '../../../../models/Vocabulary/IWord';
import { ElementsList } from '../../../../components/ElementsList/ElementsList';

const TEXT_SECONDARY_WORDS = 'Secondary words';
const TEXT_TRANSLATES = 'Translates';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type TWordCardProps = {
  word: IWord;
  onEditClicked: (word: IWord) => void;
};

const WordsList = React.memo(
  ({ words, title }: { words?: TWordValue[]; title: string }) => {
    if (!words || !words.length) {
      return null;
    }

    return (
      <>
        <Typography
          variant="h6"
          component="h3"
        >
          {title}
        </Typography>
        <ElementsList
          elements={words.map((w, i) => ({
            primaryText: w.value,
            id: i.toString(),
          }))}
        />
      </>
    );
  },
);

export const WordCard: React.FC<TWordCardProps> = ({ word, onEditClicked }) => {
  const [expanded, setExpanded] = useState(false);

  const title =
    word.mainWord || word.secondaryWords?.find((w) => w.isMain)?.value;
  const mainTranslate = (
    word.translates.find((t) => t.isMain) || word.translates[0]
  ).value;

  const handleExpandClicked = () => {
    setExpanded((pv) => !pv);
  };

  const handleEditClicked = () => {
    onEditClicked(word);
  };

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardHeader
        disableTypography
        sx={{ display: 'grid', gridTemplateColumns: 'calc(100% - 40px) 40px' }}
        onClick={handleExpandClicked}
        title={
          <Typography
            variant="h5"
            component="h2"
            noWrap
          >
            {title}
          </Typography>
        }
        subheader={
          <Typography
            variant="body1"
            component="span"
            noWrap
          >
            {mainTranslate}
          </Typography>
        }
        action={
          <ExpandMore
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
      />
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <WordsList
            words={word.secondaryWords}
            title={TEXT_SECONDARY_WORDS}
          />
          <WordsList
            words={word.translates}
            title={TEXT_TRANSLATES}
          />
          {word.partOfSpeech && (
            <>
              <Typography
                variant="h6"
                component="h3"
              >
                Part of speech
              </Typography>
              <Typography
                variant="body1"
                component="p"
              >
                {word.partOfSpeech}
              </Typography>
            </>
          )}
          <CardActions>
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={handleEditClicked}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </CardContent>
      </Collapse>
    </Card>
  );
};
